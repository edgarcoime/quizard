
from fastapi import APIRouter, Depends
from pydantic import BaseModel

from config.database import get_db
from core.auth import verify_user
from core.collection import create_collection, delete_collection, get_collection, update_collection


router = APIRouter()


class CollectionCreateRequest(BaseModel):
    title: str


class CollectionUpdateRequest(BaseModel):
    title: str


@router.put("/")
def create(collection: CollectionCreateRequest, db=Depends(get_db), user=Depends(verify_user)):
    return create_collection(db, user.id, collection.title)


@router.post("/{collection_id}")
def update(collection_id: str, collection: CollectionUpdateRequest, db=Depends(get_db), user=Depends(verify_user)):
    db_collection = get_collection(db, collection_id)
    if db_collection and db_collection.user_id == user.id:
        db_collection = update_collection(db, db_collection.id, collection.title)
    return db_collection


@router.delete("/{collection_id}")
def delete(collection_id: str, db=Depends(get_db), user=Depends(verify_user)):
    db_collection = get_collection(db, collection_id)
    if db_collection and db_collection.user_id == user.id:
        delete_collection(db, db_collection.id)
