from .db import db, environment, SCHEMA, add_prefix_for_prod



class Rating(db.Model):
    __tablename__ = 'ratings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), name='fk_rating_user_id_users',ondelete="CASCADE"))
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id'), name='fk_rating_recipe_id_recipes', ondelete="CASCADE"))

    ratings_user = db.relationship('User', back_populates='user_ratings')
    ratings_recipe = db.relationship('Recipe', back_populates='recipe_ratings')

    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'user_id': self.user_id,
            'recipe_id': self.recipe_id
        }