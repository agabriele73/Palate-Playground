from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])
    recipe_id = IntegerField('recipe_id', validators=[DataRequired()])