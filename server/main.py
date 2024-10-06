import os
from fastapi import APIRouter, FastAPI
from starlette.middleware.sessions import SessionMiddleware
from routes import auth
from config.settings import settings
from config.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SESSION_SECRET_KEY,
    max_age=60 * 60 * 24,
    https_only=os.getenv("ENV", "development") != "development",
)

router = APIRouter(prefix="/api")
router.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=8000)
