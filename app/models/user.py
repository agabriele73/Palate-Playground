from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import re


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    recipe_owner = db.relationship('Recipe', back_populates='owned_recipe')
    user_comments = db.relationship('Comment', back_populates='comments_user')
    user_favorites = db.relationship('Favorite', back_populates='favorites_user')

    @property
    def password(self):
        return self.hashed_password
    
    # @db.validates('email')
    # def validate_email(self, key, email):
    #     if not is_valid_email_address(email):
    #         raise ValueError('Invalid email address')
    #     return email


    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

# def is_valid_email_address(email_address) -> bool:
#     match = re.match(r"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$", email_address)
#     return bool(match)

# def is_valid_url(url) -> bool:
#     match = re.match(r"^https:\/\/[0-9A-z.]+.[0-9A-z.]+.[a-z]+$", url)
#     return bool(match)