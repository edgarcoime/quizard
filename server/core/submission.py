from fastapi import HTTPException
from sqlalchemy import and_
from sqlalchemy.orm import Session
from ai_remarks import get_ai_remarks
from config.database import Submission, SubmissionAnswer
from core.answer import get_answer
from core.card import get_card


def create_submission(db: Session, user_id, card_id, text_submission, answer_ids):
    db_card = get_card(db, card_id)
    if db_card:
        if not db_card.submissions:
            db_card.submissions = []

        db_submission = Submission(
            card_id=card_id,
            text_submission=text_submission,
            user_id=user_id
        )

        db_answers = db_card.answers
        db_correct_answers = [x.id for x in db_answers if x.is_correct]
        if db_card.question_type == "multi_select":
            correct_answers = set(db_correct_answers)
            submitted_ids = set(answer_ids)
            correct_in_submission = correct_answers.intersection(submitted_ids)
            incorrect_in_submission = submitted_ids.difference(correct_answers)

            correct_fraction = (len(correct_in_submission) / len(correct_answers)) if len(correct_answers) != 0 else 0
            penalty_fraction = (len(incorrect_in_submission) / len(db_answers)) if len(db_answers) != 0 else 0

            score = max(0, correct_fraction - penalty_fraction)
            db_submission.score = score 
        elif db_card.question_type == "single_select":
            if len(answer_ids) == 1 and len(db_correct_answers) == 1 and answer_ids[0] == db_correct_answers[0]:
                score = 1
            else:
                score = 0
            db_submission.score = score
        elif db_card.question_type == "open_ended":
            correct_answer_string = [x.answer for x in db_answers if x.is_correct][0]
            result = get_ai_remarks(correct_answer_string, text_submission)
           
            score = float(result['similarity_score']) / 100
            feedback = result['ai_remarks']
            db_submission.score = score
            db_submission.feedback = feedback

        db_submission_answers = []
        for answer_id in answer_ids:
            db_answer = get_answer(db, answer_id)
            if db_answer:
                db_submission_answers.append(
                    SubmissionAnswer(answer=db_answer, submission=db_submission)
                )
            else:
                raise HTTPException(404, "Provided answer id is invalid")

        db_card.submissions.append(db_submission)
        db.commit()
        db.refresh(db_submission)
        return db_submission


def get_submissions(db: Session, card_id, user_id):
    return db.query(Submission).filter(and_(Submission.user_id == user_id, Submission.card_id == card_id)).all()
