from sqlalchemy.orm import Session, joinedload
from config.database import Answer, Card

def get_card(db: Session, card_id):
    return db.query(Card).options(joinedload(Card.answers)).filter(Card.id == card_id).first()


def get_cards_by_collection(db: Session, collection_id):
    return db.query(Card).filter(Card.collection_id == collection_id).all()


def create_card(db: Session, collection_id, question, question_type, answers):
    db_card = Card(
        collection_id=collection_id,
        question=question,
        question_type=question_type
    )
    db_card.answers = []
    for answer in answers:
        db_answer = Answer(answer=answer.answer, is_correct=answer.is_correct)
        db_card.answers.append(db_answer)

    db.add(db_card)
    db.commit()
    db.refresh(db_card)
    return db_card


def update_card(db: Session, card_id, collection_id, question, question_type):
    db_card = db.query(Card).filter(Card.id == card_id).first()
    if db_card:
        if collection_id != None:
            db_card.collection_id = collection_id
        if question != None:
            db_card.question = question
        if question_type != None:
            db_card.question_type = question_type

        db.commit()
        db.refresh(db_card)
    return db_card


def delete_card(db: Session, card_id):
    db_card = db.query(Card).filter(Card.id == card_id).first()
    db.delete(db_card)
    db.commit()

