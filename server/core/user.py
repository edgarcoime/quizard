from os import name
from sqlalchemy.orm import Session
from config.database import AuthMethod, User, UserSession


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, name, provider, sub):
    db_user = User(name=name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    db_auth_method = AuthMethod(user_id=db_user.id, provider=provider, sub=sub)
    db.add(db_auth_method)
    db.commit()
    db.refresh(db_auth_method)
    db.refresh(db_user)

    return db_user


def create_session(db: Session, user_id):
    db_session = UserSession(user_id=user_id)
    db.add(db_session)
    db.commit()
    db.refresh(db_session)

    return db_session


def get_session(db: Session, session_id):
    return db.query(UserSession).filter(UserSession.id == session_id).first()
