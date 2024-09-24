import os
from fastapi import FastAPI
from starlette.middleware.sessions import SessionMiddleware
from routes import auth
from config.settings import settings

app = FastAPI()
app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SESSION_SECRET_KEY,
    max_age=60 * 60 * 24,
    https_only=os.getenv("ENV", "development") != "development",
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=8000)
