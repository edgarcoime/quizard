from sqlalchemy.orm import Session
from config.database import Answer
from core.card import get_card


def get_answer(db: Session, answer_id: str):
    db_answer = db.query(Answer).filter(Answer.id == answer_id).first()
    return db_answer


def create_answer(db: Session, card_id, answer, is_correct):
    card = get_card(db, card_id)
    if card and card.answers:
        db_answer = Answer(
            answer = answer,
            is_correct = is_correct,
            card_id=card.id
        )
        card.answers.append(db_answer)
        db.commit()
        db.refresh(db_answer)
        return db_answer


def update_answer(db: Session, answer_id, answer, is_correct):
    db_answer = get_answer(db, answer_id)
    if db_answer:
        if answer != None:
            db_answer.answer = answer
        if is_correct != None:
            db_answer.is_correct = is_correct

        db.commit()
        db.refresh(db_answer)
        return db_answer


def delete_answer(db: Session, answer_id):
    db_answer = get_answer(db, answer_id)
    db.delete(db_answer)
    db.commit()

