from datetime import datetime 
from typing import List
from sqlalchemy import Boolean, DateTime, create_engine, func
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
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())
    expires_at:Mapped[datetime] = mapped_column(DateTime)

    user:Mapped["User"] = relationship("User", back_populates="sessions", lazy="joined")


class Collection(Base):
    __tablename__ = "collection"

    id:Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4())) 
    title:Mapped[str] = mapped_column(String, index=True)
    user_id:Mapped[str] = mapped_column(String, ForeignKey("user.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    user:Mapped["User"] = relationship("User", back_populates="collections")
    cards:Mapped[List["Card"]] = relationship("Card", back_populates="collection")


class Card(Base):
    __tablename__ = "card"

    id:Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    question:Mapped[str] = mapped_column(String, primary_key=True)
    collection_id:Mapped[str] = mapped_column(String, ForeignKey("collection.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    collection:Mapped["Collection"] = relationship("Collection", back_populates="cards")
    answer:Mapped["Answer"] = relationship("Answer", back_populates="card")
    submissions:Mapped[List["Submission"]] = relationship("Submission", back_populates="card")


class Answer(Base):
    __tablename__ = "answer"

    id:Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4())) 
    answer:Mapped[str] = mapped_column(String)
    card_id:Mapped[str] = mapped_column(String, ForeignKey("card.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    card:Mapped["Card"] = relationship("Card", back_populates="answer")


class Submission(Base):
    __tablename__ = "submission"

    id:Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4())) 
    submission:Mapped[str] = mapped_column(String)
    feedback:Mapped[str] = mapped_column(String)
    rate:Mapped[int] = mapped_column(Integer)
    card_id:Mapped[str] = mapped_column(String, ForeignKey("card.id"))
    user_id:Mapped[str] = mapped_column(String, ForeignKey("user.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    card:Mapped["Card"] = relationship("Card", back_populates="submissions")
    user:Mapped["User"] = relationship("User", back_populates="submissions")

