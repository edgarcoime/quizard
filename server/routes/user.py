from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from config.database import get_db
from core.auth import verify_user
from core.collection import get_collections_by_user_id
from core.user import get_user_by_id, update_user


router = APIRouter()


class UserUpdateRequest(BaseModel):
    username: Optional[str] = None
    name: Optional[str] = None
    picture: Optional[str] = None


@router.get("/{user_id}")
def get(user_id: str, db=Depends(get_db), user=Depends(verify_user)):
    target = user.id if user_id == "me" else user_id
    db_user = get_user_by_id(db, target)
    if db_user:
        return db_user
    else:
        raise HTTPException(404, "Could not find the user.")


@router.post("/{user_id}")
async def update(user_id: str, new_user: UserUpdateRequest, user=Depends(verify_user), db=Depends(get_db)):
    if user_id == str(user.id) or user_id == "me":
        return update_user(db, user.id, new_user)
    else:
        raise HTTPException(401, "You can only update yourself.")


@router.get("/{user_id}/collections")
async def get_collections(user_id: str, user=Depends(verify_user), db=Depends(get_db)):
    if user_id == "me":
        target_user_id = user.id
    else:
        target_user_id = user_id

    db_user = get_user_by_id(db, target_user_id)
    if db_user:
        return get_collections_by_user_id(db, target_user_id, target_user_id != user.id)
    else:
        raise HTTPException(404, "Could not find the user.")

