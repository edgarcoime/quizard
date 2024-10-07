

from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from config.database import get_db
from core.answer import create_answer, delete_answer, get_answer, update_answer
from core.auth import verify_user
from core.card import get_card


router = APIRouter()

class AnswerCreateRequest(BaseModel):
    card_id: str
    answer: str
    is_correct: bool

class AnswerUpdateRequest(BaseModel):
    answer: Optional[str] = None
    is_correct: Optional[bool] = None


@router.put("/")
def create(answer: AnswerCreateRequest, db=Depends(get_db), user=Depends(verify_user)):
    card = get_card(db, answer.card_id)
    if card and card.collection.user_id == user.id:
        return create_answer(db, card.id, answer.answer, answer.is_correct)
    raise HTTPException(401)


@router.post("/{answer_id}")
def update(answer_id: str, answer: AnswerUpdateRequest, db=Depends(get_db), user=Depends(verify_user)):
    db_answer = get_answer(db, answer_id)
    if db_answer and db_answer.card and db_answer.card.collection and db_answer.card.collection.user and db_answer.card.collection.user.id == user.id:
        return update_answer(db, answer_id, answer.answer, answer.is_correct)
    raise HTTPException(401)


@router.delete("/{answer_id}")
def delete(answer_id: str, db=Depends(get_db), user=Depends(verify_user)):
    db_answer = get_answer(db, answer_id)
    if db_answer and db_answer.card and db_answer.card.collection and db_answer.card.collection.user and db_answer.card.collection.user.id == user.id:
        return delete_answer(db, answer_id)
    raise HTTPException(401)
