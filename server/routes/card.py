
from enum import Enum
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from config.database import get_db
from core.auth import verify_user
from core.card import create_card, delete_card, get_card, update_card
from core.collection import get_collection
from core.submission import get_submissions


router = APIRouter()

class CardType(str, Enum):
    single_select = 'single_select'
    multi_select = 'multi_select'
    open_ended = 'open_ended'


class Answer(BaseModel):
    is_correct: bool
    answer: str


class CardCreateRequest(BaseModel):
    collection_id: str
    question: str
    question_type: CardType 
    answers: List[Answer]


class CardUpdateRequest(BaseModel):
    collection_id: Optional[str] = None
    question: Optional[str] = None
    question_type: Optional[CardType] = None 


@router.get("/{card_id}")
def get(card_id: str, db=Depends(get_db), user=Depends(verify_user)):
    db_card = get_card(db, card_id)
    if db_card and db_card.collection and (db_card.collection.is_public or db_card.collection.user_id == user.id):
        card = db_card.__dict__.copy()

        my_submissions = get_submissions(db, card_id, user.id) 

        card['my_submissions'] = my_submissions
        return card
    else:
        raise HTTPException(401)


@router.put("/")
def create(card: CardCreateRequest, db=Depends(get_db), user=Depends(verify_user)):
    collection = get_collection(db, card.collection_id)
    if collection and collection.user_id == user.id:
        return create_card(db, card.collection_id, card.question, card.question_type, card.answers)
    else:
        raise HTTPException(401)


@router.post("/{card_id}")
def update(card_id: str, card: CardUpdateRequest, db=Depends(get_db), user=Depends(verify_user)):
    db_card = get_card(db, card_id)
    if card.collection_id:
        target_collection = get_collection(db, card.collection_id)
        if not target_collection or target_collection.user_id != user.id:
            raise HTTPException(401)
    if db_card and db_card.collection and db_card.collection.user_id == user.id:
        return update_card(db, card_id, card.collection_id, card.question, card.question_type)
    else:
        raise HTTPException(401)


@router.delete("/{card_id}")
def delete(card_id: str, db=Depends(get_db), user=Depends(verify_user)):
    db_card = get_card(db, card_id)
    if db_card and db_card.collection and db_card.collection.user_id == user.id:
        return delete_card(db, card_id)
    else:
        raise HTTPException(401)


