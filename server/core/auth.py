from authlib.integrations.starlette_client import OAuth
from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session
from config.database import get_db
from config.settings import settings
from core.user import extend_session, get_user_from_session

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
            extend_session(db, session_id)
            return user 
        else:
            raise
    except:
        raise HTTPException(status_code=401, detail="Unauthorized")
