from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), name='fk_comment_user_id_users',ondelete="CASCADE"), nullable=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id'), name='fk_comment_recipe_id_recipes', ondelete="CASCADE"), nullable=True)

    comments_user = db.relationship('User', back_populates='user_comments')
    recipe_comment = db.relationship('Recipe', back_populates='comments_on_recipe')


    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'user_id': self.user_id,
            'recipe_id': self.recipe_id
        }