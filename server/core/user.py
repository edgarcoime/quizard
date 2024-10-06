from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from config.database import AuthMethod, User, UserSession


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_provider(db: Session, provider, sub):
    authMethods =  db.query(AuthMethod).filter(AuthMethod.provider == provider and AuthMethod.sub == sub).first()
    if authMethods:
        return authMethods.user


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
    db_session = UserSession(user_id=user_id, expires_at=datetime.now() + timedelta(hours=20))
    db.add(db_session)
    db.commit()
    db.refresh(db_session)

    return db_session

def extend_session(db: Session, session_id):
    db.query(UserSession).filter(UserSession.id == session_id).update({'expires_at': datetime.now() + timedelta(seconds=10)})
    db.commit()

def get_user_from_session(db: Session, session_id):
    valid_session = db.query(UserSession).filter(UserSession.id == session_id and UserSession.expires_at > datetime.now()).first()
    invalid_session = db.query(UserSession).filter(UserSession.id == session_id and UserSession.expires_at <= datetime.now()).first()
    if user_session:
        if datetime.now() < user_session.expires_at:
            return user_session.user
        else:
            # remove user_session

