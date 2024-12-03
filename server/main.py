from config.database import Base, engine
from config.settings import settings
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import answer, auth, card, collection, submission, user
from starlette.middleware.sessions import SessionMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "https://quizard.apps.codetemplating.com",
    "https://server.quizard.services.codetemplating.com",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key=settings.SESSION_SECRET_KEY,
    max_age=60 * 60 * 24,
    # https_only=settings.HOST.startswith("https"),
    same_site="none",
)

router = APIRouter(prefix="/api/py")
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(user.router, prefix="/user", tags=["user"])
router.include_router(collection.router, prefix="/collection", tags=["collection"])
router.include_router(card.router, prefix="/card", tags=["card"])
router.include_router(answer.router, prefix="/answer", tags=["answer"])
router.include_router(submission.router, prefix="/submission", tags=["submission"])
app.include_router(router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=8000)
