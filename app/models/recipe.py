from .db import db, environment, SCHEMA, add_prefix_for_prod


class Recipe(db.Model):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), name='fk_recipe_owner_id_users', ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    protein_type = db.Column(db.String(50), nullable=True)
    steps = db.Column(db.Text, nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    prep_time = db.Column(db.String(50), nullable=False)
    cook_time = db.Column(db.String(50), nullable=False)
    steps_link = db.Column(db.String(125), nullable=False)

    owned_recipe = db.relationship('User', back_populates='recipe_owner')
    comments_on_recipe = db.relationship('Comment', back_populates='recipe_comment')
    recipe_w_images = db.relationship('RecipeImage', back_populates='recipe_imgs')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'title': self.title,
            'protein_type': self.protein_type,
            'steps': self.steps,
            'ingredients': self.ingredients,
            'prep_time': self.prep_time,
            'cook_time': self.cook_time,
            'steps_link': self.steps_link
        }