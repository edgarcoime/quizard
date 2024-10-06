from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session
from config.database import get_db
from core.auth import oauth, verify_user
from core.user import create_user, create_session, get_user_by_provider

router = APIRouter()


@router.get("/login/{provider}")
async def login(provider: str, request: Request):
    redirect_uri = request.url_for("auth_callback", provider=provider)
    client = oauth.create_client(provider)
    return await client.authorize_redirect(request, redirect_uri)  # type: ignore


@router.get("/callback/{provider}")
async def auth_callback(provider: str, request: Request, db: Session = Depends(get_db)):
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
        session = create_session(db, user_id=user.id)
        print(session.id)
        request.session["session_id"] = session.id

    return user


@router.get("/check")
async def protected(user=Depends(verify_user)):
    return {"message": "you are authenticated", "user": user}
