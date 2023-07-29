from flask_wtf import FlaskForm
from wtforms import FloatField
from wtforms.validators import DataRequired, NumberRange

class RatingForm(FlaskForm):
    rating = FloatField('rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
