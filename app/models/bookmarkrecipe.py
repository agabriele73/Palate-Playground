from .db import db, environment, SCHEMA, add_prefix_for_prod



class BookmarkRecipe(db.Model):
    __tablename__ = 'bookmarksrecipes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id')), primary_key=True)
    bookmark_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('bookmarks.id')), primary_key=True)

    recipe = db.relationship('Recipe', backref='bookmark_recipes')
    bookmark = db.relationship('Bookmark', backref='bookmark_recipes')


    def to_dict(self):
        return {
            'id': self.id,
            'recipe_id': self.recipe_id,
            'bookmark_id': self.bookmark_id
        }