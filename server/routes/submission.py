from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from config.database import get_db
from core.auth import verify_user
from core.card import get_card
from core.submission import create_submission


router = APIRouter()


class SubmittionCreateRequest(BaseModel):
    card_id: str
    text_submission: Optional[str] = None
    answer_ids: Optional[List[str]] = []


@router.put("")
def create(submission: SubmittionCreateRequest, db=Depends(get_db), user=Depends(verify_user)):
    db_card = get_card(db, submission.card_id)
    if db_card and db_card.collection:
        if db_card.collection.user and (db_card.collection.is_public or db_card.collection.user.id == user.id):
            return create_submission(db, user.id, db_card.id, submission.text_submission, submission.answer_ids)
        else:
            raise HTTPException(401, "You are not authorized to play this flashcard.")
    else:
        raise HTTPException(404, "Could not find the card.")
