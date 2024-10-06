from datetime import datetime, timezone
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import and_
from config.database import AuthMethod, User, UserSession
import uuid


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, name, provider, sub):
    db_user = User(name=name, username=str(uuid.uuid4()))

    if not db_user.auth_methods:
        db_user.auth_methods = []
    db_user.auth_methods.append(AuthMethod(provider=provider, sub=sub))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_user_by_provider(db: Session, provider, sub):
    authMethods = (
        db.query(AuthMethod)
        .filter(and_(AuthMethod.provider == provider, AuthMethod.sub == sub))
        .first()
    )
    if authMethods:
        return authMethods.user


def get_user_from_session(db: Session, session_id):
    session = db.query(UserSession).filter(UserSession.id == session_id).first()
    if session:
        if session.expires_at.replace(tzinfo=timezone.utc) > datetime.now(timezone.utc):
            return session.user
    return None


def update_username(db: Session, user_id, new_user):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.username = new_user.username or user.username
        user.name = new_user.name or user.name
        db.commit()
        db.refresh(user)
    return user
