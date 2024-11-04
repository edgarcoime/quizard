from datetime import datetime, timezone
from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import and_
from config.database import AuthMethod, User, UserSession
from random_username.generate import generate_username
import re

from core.collection import is_uuid

def get_user_by_id_or_username(db: Session, username_or_id: str):
    if is_uuid(username_or_id):
        return get_user_by_id(db, username_or_id)
    else:
        return get_user_by_username(db, username_or_id)


def get_user_by_id(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def create_user(db: Session, name, provider, sub, picture):
    while True:
        username = re.sub(r'(?<!^)(?=[A-Z])', '_', re.sub(r'\d+','',generate_username()[0])).lower()
        exist = db.query(User).filter(User.username == username).first()
        if not exist:
            break

    db_user = User(name=name, username=username, picture=picture)

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


def update_user(db: Session, user_id, new_user):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.username = new_user.username or user.username
        user.name = new_user.name or user.name
        user.picture = new_user.picture or user.picture
        db.commit()
        db.refresh(user)
    return user
