from typing import Optional
from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from starlette.types import HTTPExceptionHandler
from config.settings import settings
from config.database import User, get_db
from core.auth import create_session, delete_session, extend_session, get_session, get_sessions, oauth, verify_user
from core.user import (
    create_user,
    get_user_by_provider,
    get_user_from_session,
    update_user,
)
from urllib.parse import urlparse, urlunparse

router = APIRouter()


@router.get("/login/{provider}")
async def login(provider: str, request: Request, redirect_to: Optional[str] = None):
    client = oauth.create_client(provider)

    referer = request.headers.get("referer")
    if referer:
        request.session["referer"] = referer
        if redirect_to:
            parsed = urlparse(referer)
            parsed = parsed._replace(path=redirect_to)
            request.session['redirect_to'] = urlunparse(parsed)
        else:
            request.session['redirect_to'] = referer

    return await client.authorize_redirect(request, settings.HOST + "/api/py/auth/callback/" + provider)  # type: ignore


@router.get("/callback/{provider}")
async def auth_callback(provider: str, request: Request, db: Session = Depends(get_db)):
    try:
        client = oauth.create_client(provider)
        token = await client.authorize_access_token(request)  # type: ignore
        user_info = token.get("userinfo")

        existing_user = get_user_by_provider(db, provider, user_info["sub"])
        if existing_user:
            user = existing_user
            update_user(db, existing_user.id, User(picture=user_info["picture"]))
        else:
            user = create_user(
                db, name=user_info["name"], provider=provider, sub=user_info["sub"], picture=user_info["picture"]
            )

        if user:
            old_session_id = request.session.get("session_id")
            old_session_user = get_user_from_session(db, old_session_id) if old_session_id else None
            if old_session_user and old_session_user.id == user.id:
                session = extend_session(db, old_session_id, request)
            else:
                if old_session_user:
                    delete_session(db, old_session_id)
                session = create_session(db, user.id, request)

            request.session["session_id"] = session.id if session else None

        return RedirectResponse(url=request.session.pop("redirect_to"))
    except Exception as e:
        print(e)
        raise HTTPException(302, "Unauthorized", headers = {"Location": request.session.pop("referer")})


@router.get("/logout")
async def logout(
    request: Request, db: Session = Depends(get_db), _=Depends(verify_user)
):
    session_id = request.session.get("session_id")
    delete_session(db, session_id)
    request.session["session_id"] = None


@router.get("/sessions")
async def sessions(request: Request, db: Session = Depends(get_db), user=Depends(verify_user)):
    db_sessions = get_sessions(db, user.id)
    session_id = request.session.get("session_id")
    sessions = []
    for session in db_sessions:
        s = session.__dict__.copy()
        s["is_current"] = session.id == session_id
        sessions.append(s)
    return sessions

@router.delete("/sessions/{session_id}")
async def session_delete(session_id: str, db: Session = Depends(get_db), user=Depends(verify_user)):
    db_session = get_session(db, session_id)
    try:
        if db_session and db_session.user_id == user.id:
            delete_session(db, db_session.id)
        else:
            raise HTTPException(401, "You are not authorized to delete other user's session")
    except:
        raise HTTPException(500, "Something went wrong")


