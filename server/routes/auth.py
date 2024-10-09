from typing import Optional
from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from config.database import get_db
from core.auth import create_session, delete_session, extend_session, get_sessions, oauth, verify_user
from core.user import (
    create_user,
    get_user_by_provider,
    get_user_from_session,
)
from urllib.parse import urlparse, urlunparse

router = APIRouter()


@router.get("/login/{provider}")
async def login(provider: str, request: Request, redirect_to: Optional[str] = None):
    redirect_uri = request.url_for("auth_callback", provider=provider)
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

    return await client.authorize_redirect(request, redirect_uri)  # type: ignore


@router.get("/callback/{provider}")
async def auth_callback(provider: str, request: Request, db: Session = Depends(get_db)):
    try:
        client = oauth.create_client(provider)
        token = await client.authorize_access_token(request)  # type: ignore
        user_info = token.get("userinfo")

        existing_user = get_user_by_provider(db, provider, user_info["sub"])
        if existing_user:
            user = existing_user
        else:
            user = create_user(
                db, name=user_info["name"], provider=provider, sub=user_info["sub"]
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
async def sessions(db: Session = Depends(get_db), user=Depends(verify_user)):
    sessions = get_sessions(db, user.id)
    return sessions


