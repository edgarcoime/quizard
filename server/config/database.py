from datetime import datetime 
from typing import List
from sqlalchemy import DateTime, create_engine, func
from sqlalchemy.orm import Mapped, sessionmaker, relationship, DeclarativeBase, mapped_column
from sqlalchemy import ForeignKey, Integer, String

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

    id:Mapped[int] = mapped_column(Integer, primary_key=True)
    name:Mapped[str] = mapped_column(String)
    username:Mapped[str] = mapped_column(String, unique=True, index=True)
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    auth_methods:Mapped[List["AuthMethod"]] = relationship("AuthMethod", back_populates="user")
    collections:Mapped[List["Collection"]] = relationship("Collection", back_populates="user")
    sessions:Mapped[List["UserSession"]] = relationship("UserSession", back_populates="user")


class AuthMethod(Base):
    __tablename__ = "authmethod"

    id:Mapped[int] = mapped_column(Integer, primary_key=True)
    provider:Mapped[str] = mapped_column(String)
    sub:Mapped[str] = mapped_column(String)
    user_id:Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    user:Mapped["User"] = relationship("User", back_populates="auth_methods", lazy="joined")


class UserSession(Base):
    __tablename__ = "usersession"

    id:Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id:Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())
    expires_at:Mapped[datetime] = mapped_column(DateTime)

    user:Mapped["User"] = relationship("User", back_populates="sessions", lazy="joined")


class Collection(Base):
    __tablename__ = "collection"

    id:Mapped[int] = mapped_column(Integer, primary_key=True)
    title:Mapped[str] = mapped_column(String, index=True)
    user_id:Mapped[int] = mapped_column(Integer, ForeignKey("user.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    user:Mapped["User"] = relationship("User", back_populates="collections")
    cards:Mapped[List["Card"]] = relationship("Card", back_populates="collection")


class Card(Base):
    __tablename__ = "card"

    id:Mapped[int] = mapped_column(Integer, primary_key=True)
    question:Mapped[str] = mapped_column(String, primary_key=True)
    collection_id:Mapped[int] = mapped_column(Integer, ForeignKey("collection.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    collection:Mapped["Collection"] = relationship("Collection", back_populates="cards")
    options:Mapped[List["Option"]] = relationship("Option", back_populates="card")


class Option(Base):
    __tablename__ = "option"

    id:Mapped[int] = mapped_column(Integer, primary_key=True)
    option:Mapped[str] = mapped_column(String)
    card_id:Mapped[int] = mapped_column(Integer, ForeignKey("card.id"))
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now())

    card:Mapped["Card"] = relationship("Card", back_populates="options")
