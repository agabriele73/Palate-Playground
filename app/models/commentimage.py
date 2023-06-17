from .db import db, environment, SCHEMA, add_prefix_for_prod



class CommentImage(db.Model):
    __tablename__ = 'comment_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')), nullable=False)

    comment = db.relationship('Comment', back_populates='comment_images')

    def to_dict(self):
        return {
            'id': self.id,
            'comment_id': self.comment_id,
            'image_url': self.image_url
        }