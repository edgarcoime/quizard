from datetime import datetime, timedelta, timezone
from authlib.integrations.starlette_client import OAuth
from fastapi import Depends, HTTPException, Request
from sqlalchemy import and_
from sqlalchemy.orm import Session
from sqlalchemy.orm.strategy_options import lazyload
from config.database import UserSession, get_db
from config.settings import settings
from core.user import get_user_from_session

oauth = OAuth()

oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
    prompt="select_account",
)

def verify_user(raise_on_error: bool = True):
    async def inner(request: Request, db: Session = Depends(get_db)):
        try:
            session_id = request.session.get("session_id")
            user = get_user_from_session(db, session_id)
            if user:
                extend_session(db, session_id, request)
                return user
            else:
                if raise_on_error: 
                    raise
                else:
                    return None
        except Exception as e:
            print(e)
            raise HTTPException(status_code=401, detail="Unauthorized")
    return inner 

verify_user_exit = verify_user(raise_on_error=True)
verify_user_return = verify_user(raise_on_error=False)


def get_sessions(db: Session, user_id):
    db_sessions = (
        db.query(UserSession)
        .options(
            lazyload(
                UserSession.user
            )
        )
        .filter(and_(UserSession.user_id == user_id, UserSession.expires_at > datetime.now(timezone.utc) ))
        .all()
    )
    return db_sessions


def get_session(db: Session, session_id):
    db_session = (
        db.query(UserSession)
        .options(
            lazyload(
                UserSession.user
            )
        )
        .filter(UserSession.id == session_id)
        .first()
    )
    return db_session


def create_session(db: Session, user_id, request: Request):
    db_session = UserSession(
        user_id=user_id,
        expires_at=datetime.now(timezone.utc) + timedelta(hours=24),
        user_agent=request.headers.get("X-user-agent") or None,
        device_model=request.headers.get("X-device-model") or None,
        browser_name=request.headers.get("X-browser-name") or None
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)

    return db_session


def extend_session(db: Session, session_id, request: Request):
    old_session = db.query(UserSession).filter(UserSession.id == session_id).first()
    if old_session:
        old_session.expires_at = datetime.now(timezone.utc) + timedelta(hours=24)
        old_session.user_agent = request.headers.get("X-user-agent") or old_session.user_agent
        old_session.device_model = request.headers.get("X-device-model") or old_session.device_model
        old_session.browser_name = request.headers.get("X-browser-name") or old_session.browser_name

        db.commit()
        db.refresh(old_session)

        return old_session


def delete_session(db: Session, session_id):
    session = db.query(UserSession).filter(UserSession.id == session_id).first()
    if session:
        db.delete(session)
        db.commit()
