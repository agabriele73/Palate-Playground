from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField, SelectField  
from wtforms.validators import DataRequired, Email, URL,ValidationError
from app.models import Recipe
import re



class RecipeForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    protein_type = SelectField('protein_type', 
                                choices=[('chicken', 'Chicken'), 
                                        ('beef', 'Beef'), 
                                        ('seafood', 'Seafood'),
                                        ('vegetarian', 'Vegetarian')], 
                                        validators=[DataRequired()])
    steps = TextAreaField('steps', validators=[DataRequired()])
    ingredients = TextAreaField('ingredients', validators=[DataRequired()])
    prep_time = StringField('prep_time', validators=[DataRequired()])
    cook_time = StringField('cook_time', validators=[DataRequired()])
    def validate_steps_link(self, field):
        if not re.match(r"^https://www.youtube.com/embed/", field.data):
            raise ValidationError('Invalid youtube embed url')
        
    steps_link = StringField('steps_link', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired(), URL(message='Invalid url format.')])

