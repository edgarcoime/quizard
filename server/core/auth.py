from datetime import datetime, timedelta, timezone
from authlib.integrations.starlette_client import OAuth
from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session, load_only
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


async def verify_user(request: Request, db: Session = Depends(get_db)):
    try:
        session_id = request.session.get("session_id")
        user = get_user_from_session(db, session_id)
        if user:
            extend_session(db, session_id, request)
            return user
        else:
            raise
    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail="Unauthorized")


def get_sessions(db: Session, user_id):
    db_sessions = (
        db.query(UserSession)
        .options(
            load_only(
                UserSession.user_agent,
                UserSession.ip_address,
                UserSession.expires_at,
                UserSession.updated_at,
            ),
            lazyload(
                UserSession.user
            )
        )
        .filter(UserSession.user_id == user_id)
        .all()
    )
    return db_sessions


def create_session(db: Session, user_id, request: Request):
    db_session = UserSession(
        user_id=user_id,
        expires_at=datetime.now(timezone.utc) + timedelta(hours=24),
        ip_address=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent"),
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)

    return db_session


def extend_session(db: Session, session_id, request: Request):
    old_session = db.query(UserSession).filter(UserSession.id == session_id).first()
    if old_session:
        old_session.expires_at = datetime.now(timezone.utc) + timedelta(hours=24)
        old_session.ip_address = request.client.host if request.client else ""
        old_session.user_agent = request.headers.get("user-agent") or ""

        db.commit()
        db.refresh(old_session)

        return old_session


def delete_session(db: Session, session_id):
    session = db.query(UserSession).filter(UserSession.id == session_id).first()
    if session:
        db.delete(session)
        db.commit()
