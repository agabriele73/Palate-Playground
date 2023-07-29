from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import db, Rating, User, Recipe

rating_routes = Blueprint('ratings', __name__)

@rating_routes.route('', methods=['GET'])
@login_required
def get_user_ratings():
    ratings = Rating.query.filter_by(user_id=current_user.id).all()
    rating_data = []
    for rating in ratings:
        rating_owners = User.query.filter_by(id=rating.user_id).all()
        rating_recipes = Recipe.query.filter_by(id=rating.recipe_id).all()
        owner = [ owner.username for owner in rating_owners]
        recipe = [ [{"id": recipe.id, "title": recipe.title}] for recipe in rating_recipes]
    
        rating_dict = {
            'id': rating.id,
            'user_id': rating.user_id,
            'recipe_id': rating.recipe_id,
            'rating': rating.rating,
            'owner': owner,
            'recipe': recipe
        }
    
        rating_data.append(rating_dict)
    
    return jsonify({"Ratings": rating_data})



@rating_routes.route('/<int:rating_id>', methods=['DELETE'])
@login_required
def delete_rating(rating_id):
    rating = Rating.query.get(rating_id)
    if not rating:
        return jsonify({'message': 'Rating not found'}), 404
    if rating.user_id != current_user.id:
        return jsonify({'message': 'You do not own this rating'}), 401
    db.session.delete(rating)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted'}), 200