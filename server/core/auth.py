from authlib.integrations.starlette_client import OAuth
from fastapi import HTTPException, Request
from config.settings import settings

oauth = OAuth()

oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
    prompt="select_account",
)


async def verify_user(request: Request):
    try:
        user = request.session.get("user")
        if not user:
            raise
        return user
    except:
        raise HTTPException(status_code=401, detail="Unauthorized")
