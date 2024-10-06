from datetime import datetime
from sqlalchemy import DateTime, create_engine, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    user_name = Column(String, unique=True, index=True)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=datetime.now)

    auth_methods = relationship("AuthMethod", back_populates="user")
    collections = relationship("Collection", back_populates="user")
    sessions = relationship("UserSession", back_populates="user")


class AuthMethod(Base):
    __tablename__ = "authmethod"

    id = Column(Integer, primary_key=True)
    provider = Column(String)
    sub = Column(String)
    user_id = Column(Integer, ForeignKey("user.id"))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=datetime.now)

    user = relationship("User", back_populates="auth_methods")


class UserSession(Base):
    __tablename__ = "usersession"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=datetime.now)
    expires_at = Column(DateTime)

    user = relationship("User", back_populates="sessions")


class Collection(Base):
    __tablename__ = "collection"

    id = Column(Integer, primary_key=True)
    title = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("user.id"))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=datetime.now)

    user = relationship("User", back_populates="collections")
    cards = relationship("Card", back_populates="collection")


class Card(Base):
    __tablename__ = "card"

    id = Column(Integer, primary_key=True)
    question = Column(String, primary_key=True)
    collection_id = Column(Integer, ForeignKey("collection.id"))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=datetime.now)

    collection = relationship("Collection", back_populates="cards")
    options = relationship("Option", back_populates="card")


class Option(Base):
    __tablename__ = "option"

    id = Column(Integer, primary_key=True)
    option = Column(String)
    card_id = Column(Integer, ForeignKey("card.id"))
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=datetime.now)

    card = relationship("Card", back_populates="options")
