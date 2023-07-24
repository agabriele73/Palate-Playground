from flask_wtf import FlaskForm
from wtforms import RadioField, BooleanField
from wtforms.validators import DataRequired


class FavoriteForm(FlaskForm):
    fave = BooleanField('fave', validators=[DataRequired()])
