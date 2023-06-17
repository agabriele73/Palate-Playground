from .db import db, environment, SCHEMA, add_prefix_for_prod



class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    like = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), nullable=False)

    user = db.relationship('User', back_populates='likes')
    recipe = db.relationship('Recipe', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'like': self.like,
            'user_id': self.user_id,
            'recipe_id': self.recipe_id
        }
    