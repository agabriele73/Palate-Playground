from app.models import db, Rating, environment, SCHEMA
from sqlalchemy.sql import text


def seed_ratings():
    

    ratings = [
        Rating(rating=5, user_id=1, recipe_id=2),
        Rating(rating=4, user_id=3, recipe_id=2),
        Rating(rating=3, user_id=2, recipe_id=1),
        Rating(rating=2, user_id=3, recipe_id=1),
        Rating(rating=2, user_id=1, recipe_id=3),
        Rating(rating=3, user_id=2, recipe_id=3),
        Rating(rating=4, user_id=3, recipe_id=4),
        Rating(rating=5, user_id=2, recipe_id=4),
        Rating(rating=4, user_id=3, recipe_id=5),
        Rating(rating=5, user_id=1, recipe_id=5),
        Rating(rating=4, user_id=2, recipe_id=6),
    ]
    db.session.bulk_save_objects(ratings)
    db.session.commit()

def undo_ratings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ratings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ratings"))