from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text



def seed_comments():

    comment1 = Comment(
        user_id=1,
        recipe_id=2,
        comment="This is a test comment"
    )

    comment2 = Comment(
        user_id=2,
        recipe_id=1,
        comment="This is a test comment"
    )

    comment3 = Comment(
        user_id=3,
        recipe_id=4,
        comment="This is a test comment"
    )

    comment4 = Comment(
        user_id=1,
        recipe_id=3,
        comment="This is a test comment"
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()