
from sqlalchemy import and_
from sqlalchemy.orm import Session

from config.database import Collection


def get_collection(db: Session, collection_id):
    collection = db.query(Collection).filter(Collection.id == collection_id).first()
    return collection


def get_collections_by_user_id(db: Session, user_id, only_public=True):
    if only_public:
        collections = db.query(Collection).filter(and_(Collection.user_id == user_id, Collection.is_public == True)).all()
    else:
        collections = db.query(Collection).filter(Collection.user_id == user_id).all()
    return collections


def create_collection(db: Session, user_id, collection_title, is_public):
    db_collection = Collection(
        user_id=user_id,
        title=collection_title,
        is_public=is_public
    )

    db.add(db_collection)
    db.commit()
    db.refresh(db_collection)
    return db_collection


def update_collection(db: Session, collection_id, collection_title, is_public):
    db_collection = db.query(Collection).filter(Collection.id == collection_id).first()
    if db_collection:
        if collection_title != None:
            db_collection.title = collection_title
        if is_public != None:
            db_collection.is_public = is_public
        db.commit()
        db.refresh(db_collection)
    return db_collection


def delete_collection(db: Session, collection_id):
    db_collection = db.query(Collection).filter(Collection.id == collection_id).first()
    if db_collection:
        db.delete(db_collection)
        db.commit()
