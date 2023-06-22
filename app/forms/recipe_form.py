from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, SelectField  
from wtforms.validators import DataRequired, Email, URL,ValidationError
from app.models import Recipe


class RecipeForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    protein_type = SelectField('protein_type', 
                                choices=[('chicken', 'chicken'), 
                                        ('beef', 'beef'), 
                                        ('seafood', 'seafood'),
                                        ('vegetarian', 'vegetarian'), 
                                        ('none', 'none')], 
                                        validators=[DataRequired()])
    steps = TextAreaField('steps', validators=[DataRequired()])
    ingredients = TextAreaField('ingredients', validators=[DataRequired()])
    prep_time = StringField('prep_time', validators=[DataRequired()])
    cook_time = StringField('cook_time', validators=[DataRequired()])
    steps_link = StringField('steps_link', validators=[DataRequired(), URL(message='Invalid url format.')])

