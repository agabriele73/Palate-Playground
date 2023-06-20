from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, URL
from app.models import RecipeImage

class RecipeImageForm(FlaskForm):
    image_url = StringField('image_url', validators=[DataRequired(), URL(message='Invalid url format.')])