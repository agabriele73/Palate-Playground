from .db import db, environment, SCHEMA, add_prefix_for_prod


class Recipe(db.Model):
    __tablename__ = 'recipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    protein_type = db.Column(db.String(255), nullable=False)
    steps = db.Column(db.String(5000), nullable=False)
    ingredients = db.Column(db.String(5000), nullable=False)
    prep_time = db.Column(db.String(255), nullable=False)
    cook_time = db.Column(db.String(255), nullable=False)
    steps_link = db.Column(db.String(255), nullable=False)

    owner = db.relationship('User', back_populates='recipe_owner')
    comments = db.relationship('Comment', back_populates='recipe')
    likes = db.relationship('Like', back_populates='recipe')
    recipe_images = db.relationship('RecipeImage', back_populates='recipe')
    bookmarks = db.relationship('BookmarkRecipe', backref='recipe')
    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'bookmark_id': self.bookmark_id,
            'title': self.title,
            'protein_type': self.protein_type,
            'steps': self.steps,
            'ingredients': self.ingredients,
            'prep_time': self.prep_time,
            'cook_time': self.cook_time,
            'steps_link': self.steps_link
        }