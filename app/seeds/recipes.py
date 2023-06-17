from app.models import db, Recipe, environment, SCHEMA
from sqlalchemy.sql import text


def seed_recipes():
    demo = Recipe(
        owner_id=1,
        bookmark_id=1,
        title='test title',
        protein_type='test protein',
        steps='test steps',
        ingredients='test ingredients',
        prep_time='test prep time',
        cook_time='test cook time',
        steps_link='test steps link'
    )

    db.session.add(demo)
    db.session.commit()


def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipes"))