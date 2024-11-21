from uuid import uuid4

from sqlalchemy import create_engine, Column, String, Boolean, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base

# Define the base class for declarative models
Base = declarative_base()

# Define your models
class Collection(Base):
    __tablename__ = 'collection'
    id = Column(String, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True)
    title = Column(String)
    is_public = Column(Boolean, default=True)
    user_id = Column(String)

class Card(Base):
    __tablename__ = 'card'
    id = Column(String, primary_key=True, index=True)
    # slug = Column(String, unique=True, index=True)
    question = Column(String)
    question_type = Column(String)
    collection_id = Column(String, ForeignKey('collection.id'))

class Answer(Base):
    __tablename__ = 'answer'
    id = Column(String, primary_key=True, index=True)
    answer = Column(String)
    is_correct = Column(Boolean)
    card_id = Column(String, ForeignKey('card.id'))

# Sample data with UUIDs
sample_collection = [
    {"name": "Software Engineering", "slug": "software-engineering"},
    {"name": "Calculus", "slug": "calculus"},
    {"name": "Operating Systems", "slug": "operating-systems"},
    {"name": "Network Security", "slug": "network-security"}
]


sample_card = [
    {
        "collection_slug": "software-engineering",
        "card": [
            {
                # "slug": "What-is-coupling?",
                "question": "What is coupling?",
                "question_type": "open_ended",
                "answer": [{"answer": "When one class is too dependent on another class", "is_correct": True}]
            },
            {
                # "slug": "What-is-a-class-diagram?",
                "question": "What is a class diagram?",
                "question_type": "open_ended",
                "answer": [{"answer": "Diagram that shows the relationships between classes", "is_correct": True}]
            },
            {
                # "slug": "Why-is-a-sequence-diagram-unique?",
                "question": "Why is a sequence diagram unique?",
                "question_type": "open_ended",
                "answer": [{"answer": "Shows the time flow of a program", "is_correct": True}]
            },
        ]
    },
    {
        "collection_slug": "calculus",
        "card": [
            {
                # "slug": "What-does-a-derivative-represent?",
                "question": "What does a derivative represent?",
                "question_type": "open_ended",
                "answer": [{"answer": "The slope of the original graph", "is_correct": True}]
            }
        ]
    },
    {
        "collection_slug": "operating-systems",
        "card": [
            {
                # "slug": "What-does-SMP-stand-for?",
                "question": "What does SMP stand for?",
                "question_type": "open_ended",
                "answer": [{"answer": "Symmetric multi-processing", "is_correct": True}]
            }
        ]
    },
    {
        "collection_slug": "network-security",
        "card": [
            {
                # "slug": "What-does-a-firewall-do?",
                "question": "What does a firewall do?",
                "question_type": "open_ended",
                "answer": [{"answer": "It helps block and monitor incoming and outgoing traffic", "is_correct": True}]
            }
        ]
    },
]

# Define your SQLite database URI
DATABASE_URI = 'sqlite:///./sql_app.db'

# Create the database engine
engine = create_engine(DATABASE_URI)

# Create a session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the tables (if they don't already exist)
Base.metadata.create_all(bind=engine)

def populate_database():
    session = SessionLocal()
    
    try:
        # Adding Collection
        collection_map = {}
        for collection_data in sample_collection:
            collection = Collection(
                id=str(uuid4()), 
                slug=collection_data["slug"], 
                title=collection_data["name"], 
                is_public=True,
                user_id="user_id_placeholder" , # Replace with actual user_id if needed
            )
            session.add(collection)
            collection_map[collection_data["slug"]] = collection

        session.commit()

        # Adding Card and Answer
        for card_data in sample_card:
            collection = collection_map.get(card_data["collection_slug"])
            if not collection:
                continue

            for card_info in card_data["card"]:
                card = Card(
                    id=str(uuid4()),
                    # slug = card_info["slug"],
                    question=card_info["question"],
                    question_type=card_info["question_type"],
                    collection_id=collection.id
                )
                session.add(card)
                
                for answer_info in card_info["answer"]:
                    answer = Answer(
                        id=str(uuid4()),
                        answer=answer_info["answer"],
                        is_correct=answer_info["is_correct"],
                        card_id=card.id
                    )
                    session.add(answer)

        # Commit all changes
        session.commit()
        print("Database populated with sample data for collection, card, and answer.")

    except Exception as e:
        session.rollback()
        print("An error occurred:", e)
    finally:
        session.close()

if __name__ == "__main__":
    populate_database()
