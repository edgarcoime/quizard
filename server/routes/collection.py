
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from config.database import get_db
from core.auth import verify_user
from core.collection import create_collection, delete_collection, get_collection, get_collection_by_slug, is_uuid, update_collection


router = APIRouter()


class CollectionCreateRequest(BaseModel):
    slug: str = Field(pattern=r'^[a-zA-Z0-9-]{3,20}$')
    title: str
    is_public: Optional[bool] = True


class CollectionUpdateRequest(BaseModel):
    slug: Optional[str] = Field(default=None, pattern=r'^[a-zA-Z0-9-]{3,20}$')
    title: Optional[str] = None
    is_public: Optional[bool] = None


@router.put("")
def create(collection: CollectionCreateRequest, db=Depends(get_db), user=Depends(verify_user)):
    if is_uuid(collection.slug):
        raise HTTPException(400, "Slug cannot be uuid format. Got '{value}'".format(value=collection.slug))
    exist = get_collection_by_slug(db, user.id, collection.slug)
    if exist:
        raise HTTPException(409, "{value} already exists".format(value=collection.slug))
    else:
        return create_collection(db, user.id, collection.slug, collection.title, collection.is_public)


@router.post("/{collection_id_or_slug}")
def update(collection_id_or_slug: str, collection: CollectionUpdateRequest, db=Depends(get_db), user=Depends(verify_user)):
    db_collection = get_collection(db, collection_id_or_slug)
    if db_collection:
        if collection.slug:
            if is_uuid(collection.slug):
                raise HTTPException(400, "Slug cannot be uuid format. Got '{value}'".format(value=collection.slug))
            exist = get_collection_by_slug(db, db_collection.user_id, collection.slug)
            if exist and exist.id != db_collection.id:
                raise HTTPException(409, "{value} already exists".format(value=collection.slug))

        if db_collection.user_id == user.id:
            db_collection = update_collection(db, db_collection.id, collection.slug, collection.title, collection.is_public)
            return db_collection
        else:
            raise HTTPException(401, "You are not the owner of the collection.")
    else:
        raise HTTPException(404, "Could not find the collection.")


@router.delete("/{collection_id_or_slug}")
def delete(collection_id_or_slug: str, db=Depends(get_db), user=Depends(verify_user)):
    db_collection = get_collection(db, collection_id_or_slug)
    if db_collection:
        if db_collection.user_id == user.id:
            return delete_collection(db, db_collection.id)
        else:
            raise HTTPException(401, "You are not the owner of the collection.")
    else:
        raise HTTPException(404, "Could not find the collection.")


@router.get("/{collection_id_or_slug}")
def get(collection_id_or_slug: str, db=Depends(get_db), user=Depends(verify_user)):
    db_collection = get_collection(db, collection_id_or_slug)
    if db_collection:
        if db_collection.is_public or db_collection.user_id == user.id:
            return db_collection
        else:
            raise HTTPException(401, "You are not allowed to see this collection.")
    else:
        raise HTTPException(404, "Could not find the collection.")

@router.get("/{collection_id_or_slug}/cards")
def get_cards(collection_id_or_slug: str, db=Depends(get_db), user=Depends(verify_user)):
    db_collection = get_collection(db, collection_id_or_slug)
    if db_collection:
        if db_collection.is_public or db_collection.user_id == user.id:
            return db_collection.cards
        else:
            raise HTTPException(401, "You are not allowed to see this collection.")
    else:
        raise HTTPException(404, "Could not find the collection.")

