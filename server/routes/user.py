from typing import Optional
from fastapi import APIRouter, Depends, HTTPException 
from pydantic import BaseModel
from config.database import get_db
from core.auth import verify_user
from core.collection import get_collections_by_user_id
from core.user import get_user_by_id, get_user_by_id_or_username, update_user


router = APIRouter()


class UserUpdateRequest(BaseModel):
    username: Optional[str] = None
    name: Optional[str] = None
    picture: Optional[str] = None


@router.get("/{id_or_username}")
def get(id_or_username: str, db=Depends(get_db), user=Depends(verify_user(raise_on_error=False))):
    targetIdOrUsername = user.username if (id_or_username == "me" and user) else id_or_username
    db_user = get_user_by_id_or_username(db, targetIdOrUsername)
    if db_user:
        return db_user
    else:
        raise HTTPException(404, "Could not find the user.")


@router.post("/{id_or_username}")
async def update(id_or_username: str, new_user: UserUpdateRequest, user=Depends(verify_user()), db=Depends(get_db)):
    targetIdOrUsername = user.username if id_or_username == "me" else id_or_username
    db_user = get_user_by_id_or_username(db, targetIdOrUsername)
    if db_user:
        if db_user.id == user.id:
            return update_user(db, user.id, new_user)
        else:
            raise HTTPException(401, "You can only update yourself.")
    else:
        raise HTTPException(404, "No user found")


@router.get("/{id_or_username}/collections")
async def get_collections(id_or_username: str, db=Depends(get_db), user=Depends(verify_user(raise_on_error=False))):
    targetIdOrUsername = user.username if (id_or_username == "me" and user) else id_or_username
    db_user = get_user_by_id_or_username(db, targetIdOrUsername)

    if not db_user:
        raise HTTPException(404, "No user found")

    target_user_id = db_user.id
    db_user = get_user_by_id(db, target_user_id)
    if db_user:
        return get_collections_by_user_id(db, target_user_id, not user or target_user_id != user.id)
    else:
        raise HTTPException(404, "Could not find the user.")

