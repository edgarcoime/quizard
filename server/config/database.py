from datetime import datetime 
from typing import List, Optional
from sqlalchemy import Boolean, DateTime, Enum, Float, create_engine, func
from sqlalchemy.orm import Mapped, sessionmaker, relationship, DeclarativeBase, mapped_column
from sqlalchemy import ForeignKey, Integer, String
import uuid

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "user"

    id:Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name:Mapped[str] = mapped_column(String)
    username:Mapped[str] = mapped_column(String, unique=True, index=True)
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    auth_methods:Mapped[List["AuthMethod"]] = relationship("AuthMethod", back_populates="user")
    collections:Mapped[List["Collection"]] = relationship("Collection", back_populates="user")
    sessions:Mapped[List["UserSession"]] = relationship("UserSession", back_populates="user")
    submissions:Mapped[List["Submission"]] = relationship("Submission", back_populates="user")


class AuthMethod(Base):
    __tablename__ = "authmethod"

    id:Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    provider:Mapped[str] = mapped_column(String)
    sub:Mapped[str] = mapped_column(String)
    user_id:Mapped[str] = mapped_column(String, ForeignKey("user.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    user:Mapped["User"] = relationship("User", back_populates="auth_methods", lazy="joined")


class UserSession(Base):
    __tablename__ = "usersession"

    id:Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4())) 
    user_id:Mapped[str] = mapped_column(String, ForeignKey("user.id"))
    user_agent: Mapped[str] = mapped_column(String)
    ip_address: Mapped[str] = mapped_column(String)
    ip_country: Mapped[str] = mapped_column(String)
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())
    expires_at:Mapped[datetime] = mapped_column(DateTime)

    user:Mapped["User"] = relationship("User", back_populates="sessions", lazy="joined")


class Collection(Base):
    __tablename__ = "collection"

    id:Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4())) 
    slug:Mapped[str] = mapped_column(String, index=True)
    title:Mapped[str] = mapped_column(String, index=True)
    is_public:Mapped[bool] = mapped_column(Boolean, default=True)
    user_id:Mapped[str] = mapped_column(String, ForeignKey("user.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    user:Mapped["User"] = relationship("User", back_populates="collections")
    cards:Mapped[List["Card"]] = relationship("Card", back_populates="collection", cascade="all,delete")


class Card(Base):
    __tablename__ = "card"

    id:Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    question:Mapped[str] = mapped_column(String)
    question_type:Mapped[str] = mapped_column(Enum('single_select', 'multi_select', 'open_ended'), nullable=False)
    collection_id:Mapped[str] = mapped_column(String, ForeignKey("collection.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    collection:Mapped["Collection"] = relationship("Collection", back_populates="cards")
    answers:Mapped[List["Answer"]] = relationship("Answer", back_populates="card", cascade="all,delete")
    submissions:Mapped[List["Submission"]] = relationship("Submission", back_populates="card", cascade="all,delete")


class Answer(Base):
    __tablename__ = "answer"

    id:Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4())) 
    answer:Mapped[str] = mapped_column(String)
    is_correct:Mapped[bool] = mapped_column(Boolean, default=True)
    card_id:Mapped[str] = mapped_column(String, ForeignKey("card.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    card:Mapped["Card"] = relationship("Card", back_populates="answers")
    submission_answers:Mapped[List["SubmissionAnswer"]] = relationship("SubmissionAnswer", back_populates="answer", cascade="all,delete")


class Submission(Base):
    __tablename__ = "submission"

    id:Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4())) 
    text_submission:Mapped[Optional[str]] = mapped_column(String, nullable=True)
    feedback:Mapped[str] = mapped_column(String, nullable=True)
    score:Mapped[float] = mapped_column(Float, nullable=True)
    card_id:Mapped[str] = mapped_column(String, ForeignKey("card.id"))
    user_id:Mapped[str] = mapped_column(String, ForeignKey("user.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    card:Mapped["Card"] = relationship("Card", back_populates="submissions")
    user:Mapped["User"] = relationship("User", back_populates="submissions")
    submission_answers:Mapped[List["SubmissionAnswer"]] = relationship("SubmissionAnswer", back_populates="submission", cascade="all,delete")


class SubmissionAnswer(Base):
    __tablename__ = "submission_answer"

    id:Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4())) 
    submission_id:Mapped[str] = mapped_column(String, ForeignKey("submission.id"))
    answer_id:Mapped[str] = mapped_column(String, ForeignKey("answer.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    submission:Mapped["Submission"] = relationship("Submission", back_populates="submission_answers")
    answer:Mapped["Answer"] = relationship("Answer", back_populates="submission_answers")


