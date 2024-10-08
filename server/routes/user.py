from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from config.database import get_db
from core.auth import verify_user
from core.collection import get_collections_by_user_id
from core.user import get_user_by_id, update_username


router = APIRouter()


class UserUpdateRequest(BaseModel):
    username: str
    name: str


@router.get("/{user_id}")
def get(user_id: str, db=Depends(get_db), user=Depends(verify_user)):
    try:
        target = user.id if user_id == "me" else user_id
        return get_user_by_id(db, target)
    except:
        raise HTTPException(400)


@router.post("/{user_id}")
async def update(
    user_id: str,
    new_user: UserUpdateRequest,
    user=Depends(verify_user),
    db=Depends(get_db),
):
    if user_id == str(user.id) or user_id == "me":
        return update_username(db, user.id, new_user)
    else:
        raise HTTPException(401, "Unauthorized")


@router.get("/{user_id}/collections")
async def get_collections(
    user_id: str,
    user=Depends(verify_user),
    db=Depends(get_db),
):
    if user_id == "me":
        target_user_id = user.id
    else:
        target_user_id = user_id

    return get_collections_by_user_id(db, target_user_id, target_user_id != user.id)

