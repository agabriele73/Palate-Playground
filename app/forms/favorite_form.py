from flask_wtf import FlaskForm
from wtforms import RadioField
from wtforms.validators import DataRequired


class FavoriteForm(FlaskForm):
    fave = RadioField('fave', validators=[DataRequired()])
    