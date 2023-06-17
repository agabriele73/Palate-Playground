from .db import db, environment, SCHEMA, add_prefix_for_prod



from .db import db, environment, SCHEMA, add_prefix_for_prod

bookmarkrecipes = db.Table(
    "bookmarkrecipes",
    db.Model.metadata,
    db.Column("recipes", db.Integer, db.ForeignKey(add_prefix_for_prod("recipes.id")), primary_key=True),
    db.Column("bookmarks", db.Integer, db.ForeignKey(add_prefix_for_prod("bookmarks.id")), primary_key=True),
)

if environment == "production":
    bookmarkrecipes.schema = SCHEMA