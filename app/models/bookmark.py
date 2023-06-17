from .db import db, environment, SCHEMA, add_prefix_for_prod


class Bookmark(db.Model):
    __tablename__ = 'bookmarks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    onwer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    bookmark_name = db.Column(db.String(255), nullable=False)

    owner = db.relationship('User', back_populates='bookmark_owner')
    recipes = db.relationship('BookmarkRecipe', backref='bookmark')

    def to_dict(self):
        return {
            'id': self.id,
            'onwer_id': self.onwer_id,
            'bookmark_name': self.bookmark_name
        }