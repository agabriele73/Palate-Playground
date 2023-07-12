from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite(db.Model):
    __tablename__ = 'favorites'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    fave = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), name='fk_favorite_user_id_users',ondelete="CASCADE"))
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id'), name='fk_favorite_recipe_id_recipes', ondelete="CASCADE"))

    favorites_user = db.relationship('User', back_populates='user_favorites')
    favorites_recipe = db.relationship('Recipe', back_populates='recipe_favorites')

    def to_dict(self):
        return {
            'id': self.id,
            'fave': self.fave,
            'user_id': self.user_id,
            'recipe_id': self.recipe_id
        }