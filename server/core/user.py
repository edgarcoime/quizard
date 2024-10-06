from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from config.database import AuthMethod, User, UserSession
import uuid

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_provider(db: Session, provider, sub):
    authMethods =  db.query(AuthMethod).filter(AuthMethod.provider == provider and AuthMethod.sub == sub).first()
    if authMethods:
        return authMethods.user


def create_user(db: Session, name, provider, sub):
    db_user = User(name=name, user_name=str(uuid.uuid4()))

    if not db_user.auth_methods:
        db_user.auth_methods = []
    db_user.auth_methods.append(AuthMethod(provider=provider, sub=sub))
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def create_session(db: Session, user_id):
    db_session = UserSession(user_id=user_id, expires_at=datetime.now() + timedelta(seconds=24))
    db.add(db_session)
    db.commit()
    db.refresh(db_session)

    return db_session

def extend_session(db: Session, session_id):
    old_session = db.query(UserSession).filter(UserSession.id == session_id).first()
    if old_session:
        old_session.expires_at = datetime.now() + timedelta(hours=24)
        db.commit()
        db.refresh(old_session)

        return old_session

def get_user_from_session(db: Session, session_id):
    session = db.query(UserSession).filter(UserSession.id == session_id).first()
    if session:
        if session.expires_at > datetime.now():
            return session.user
    return None
