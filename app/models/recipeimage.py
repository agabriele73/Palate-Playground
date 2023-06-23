from .db import db, environment, SCHEMA, add_prefix_for_prod



class RecipeImage(db.Model):
    __tablename__ = 'recipe_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id'), name='fk_recipe_image_recipe_id_recipes', ondelete="CASCADE"))
    image_url = db.Column(db.String(100), nullable=False)

    recipe_imgs = db.relationship('Recipe', back_populates='recipe_w_images')

    def to_dict(self):
        return {
            'id': self.id,
            'recipe_id': self.recipe_id,
            'image_url': self.image_url
        }
