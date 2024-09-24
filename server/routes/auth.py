from fastapi import APIRouter, Request, Depends
from starlette.responses import RedirectResponse
from core.auth import oauth, verify_user

router = APIRouter()


@router.get("/login/{provider}")
async def login(provider: str, request: Request):
    redirect_uri = request.url_for("auth_callback", provider=provider)
    client = oauth.create_client(provider)
    return await client.authorize_redirect(request, redirect_uri)  # type: ignore


@router.get("/callback/{provider}")
async def auth_callback(provider: str, request: Request):
    client = oauth.create_client(provider)
    token = await client.authorize_access_token(request)  # type: ignore
    user_info = token.get("userinfo")

    # create new user if necessary
    user = {"user_id": "add ID from db here", "name": user_info.name}

    if user_info:
        request.session["user"] = user

    return RedirectResponse("/auth/check")


@router.get("/check")
async def protected(user=Depends(verify_user)):
    return {"message": "you are authenticated", "user": user}
