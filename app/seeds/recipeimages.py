from app.models import db, RecipeImage, environment, SCHEMA
from sqlalchemy.sql import text



def seed_recipeimages():
    recipeimage1 = RecipeImage(
        recipe_id=1,
        image_url='image.url'
    )
    recipeimage2 = RecipeImage(
        recipe_id=2,
        image_url='https://i.imgur.com/EDkTzM4.jpg'
    )
    recipeimage3 = RecipeImage(
        recipe_id=3,
        image_url='https://i.imgur.com/uKTWVr6.jpg'
    )
    recipeimage4 = RecipeImage(
        recipe_id=4,
        image_url='https://i.imgur.com/Tpuy1Eq.jpg'
    )

    db.session.add(recipeimage1)
    db.session.add(recipeimage2)
    db.session.add(recipeimage3)
    db.session.add(recipeimage4)
    db.session.commit()

def undo_recipeimages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipe_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM recipe_images"))

    db.session.commit()