from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Favorite, Recipe, User, db

favorite_routes = Blueprint('favorites', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@favorite_routes.route('', methods=['GET'])
@login_required
def get_user_favorites():
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    favorite_data = []
    for favorite in favorites:
        favorite_owners = User.query.filter_by(id=favorite.user_id).all()
        favorite_recipes = Recipe.query.filter_by(id=favorite.recipe_id).all()
        owner = [ owner.username for owner in favorite_owners]
        recipe = [ recipe.to_dict() for recipe in favorite_recipes]
    
        favorite_dict = {
            'id': favorite.id,
            'user_id': favorite.user_id,
            'recipe_id': favorite.recipe_id,
            'fave': favorite.fave,
            'owner': owner,
            'recipe': recipe
        }
    
        favorite_data.append(favorite_dict)
    
    return jsonify({"Favorites": favorite_data})


@favorite_routes.route('/<int:favorite_id>', methods=['DELETE'])
@login_required
def delete_favorite(favorite_id):
    favorite = Favorite.query.get(favorite_id)
    if not favorite:
        return jsonify({'message': 'Favorite not found'}), 404
    
    if favorite.user_id != current_user.id:
        return jsonify({'message': 'You do not own this favorite'}), 401
    
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted'}), 200