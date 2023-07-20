from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms import RecipeForm, FavoriteForm
from app.models import Recipe, User, Favorite, db

recipe_routes = Blueprint('recipes', __name__)
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@recipe_routes.route('', methods=['GET'])
def get_all_recipes():

    recipes = Recipe.query.all()

    recipe_data = []
    for recipe in recipes:
        recipe_owners = User.query.filter_by(id=recipe.owner_id).all()
        owner = [ owner.username for owner in recipe_owners]

        recipe_dict = {
            'id': recipe.id,
            'owner_id': recipe.owner_id,
            'title': recipe.title,
            'protein_type': recipe.protein_type,
            'steps': recipe.steps,
            'ingredients': recipe.ingredients,
            'prep_time': recipe.prep_time,
            'cook_time': recipe.cook_time,
            'steps_link': recipe.steps_link,
            'image_url': recipe.image_url,
            'owner': owner
        }

        recipe_data.append(recipe_dict)

    return jsonify({"Recipes": recipe_data})

@recipe_routes.route('/my-recipes', methods=['GET'])
@login_required
def get_my_recipes():
    recipes = Recipe.query.filter_by(owner_id=current_user.id).all()
    recipe_data = []
    for recipe in recipes:
        recipe_owners = User.query.filter_by(id=recipe.owner_id).all()
        owner = [ owner.username for owner in recipe_owners]

        recipe_dict = {
            'id': recipe.id,
            'owner_id': recipe.owner_id,
            'title': recipe.title,
            'protein_type': recipe.protein_type,
            'steps': recipe.steps,
            'ingredients': recipe.ingredients,
            'prep_time': recipe.prep_time,
            'cook_time': recipe.cook_time,
            'steps_link': recipe.steps_link,
            'image': recipe.image_url,
            'owner': owner
        }

        recipe_data.append(recipe_dict)
    return jsonify({"Recipes": recipe_data})

@recipe_routes.route('/<int:recipe_id>', methods=['GET'])
def get_recipe_byId(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    recipe_owners = User.query.filter_by(id=recipe.owner_id).all()
    owner = [ owner.username for owner in recipe_owners]

    recipe_dict = {
        'id': recipe.id,
        'owner_id': recipe.owner_id,
        'title': recipe.title,
        'protein_type': recipe.protein_type,
        'steps': recipe.steps,
        'ingredients': recipe.ingredients,
        'prep_time': recipe.prep_time,
        'cook_time': recipe.cook_time,
        'steps_link': recipe.steps_link,
        'image_url': recipe.image_url,
        'owner': owner
    }

    return jsonify(recipe_dict)




@recipe_routes.route('', methods=['GET', 'POST'])
@login_required
def create_recipe():
    form = RecipeForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        recipe = Recipe(
            owner_id=current_user.id,
            title=form.data['title'],
            protein_type=form.data['protein_type'],
            steps=form.data['steps'],
            ingredients=form.data['ingredients'],
            prep_time=form.data['prep_time'],
            cook_time=form.data['cook_time'],
            steps_link=form.data['steps_link'],
            image_url=form.data['image_url']
        )

        db.session.add(recipe)
        db.session.commit()

        return jsonify(recipe.to_dict())
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@recipe_routes.route('/<int:recipe_id>', methods=['GET', 'PUT'])
@login_required
def update_recipe(recipe_id):
    form = RecipeForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    if form.validate_on_submit():
        recipe = Recipe.query.get(recipe_id)

        if not recipe:
            return jsonify({'message': 'Recipe not found'}), 404
        
        if recipe.owner_id != current_user.id:
            return jsonify({'message': 'You do not own this recipe'}), 401
        print(form.data)
        recipe.title = form.data['title']
        recipe.protein_type = form.data['protein_type']
        recipe.steps = form.data['steps']
        recipe.ingredients = form.data['ingredients']
        recipe.prep_time = form.data['prep_time']
        recipe.cook_time = form.data['cook_time']
        recipe.steps_link = form.data['steps_link']
        recipe.image_url = form.data['image_url']

        db.session.commit()

        return jsonify(recipe.to_dict())
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@recipe_routes.route('/<int:recipe_id>', methods=['DELETE'])
@login_required
def delete_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)

    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404
    
    if recipe.owner_id != current_user.id:
        return jsonify({'message': 'You do not own this recipe'}), 401
    
    db.session.delete(recipe)

    db.session.commit()

    return jsonify({'message': 'Successfully deleted'}), 200


@recipe_routes.route('/<int:recipe_id>/favorite', methods=['POST'])
@login_required
def favorite_recipe(recipe_id):
    fave_form = FavoriteForm()
    fave_form['csrf_token'].data = request.cookies['csrf_token']

    if fave_form.validate_on_submit():
        recipe = Recipe.query.get(recipe_id)

        if not recipe:
            return jsonify({'message': 'Recipe not found'}), 404

        favorite_exists = Favorite.query.filter_by(user_id=current_user.id, recipe_id=recipe_id).first()
        if favorite_exists:
            return jsonify({'message': 'You already favorited this recipe'}), 401

        if recipe.owner_id == current_user.id:
            return jsonify({'message': 'You own this recipe'}), 401

        favorite = Favorite(
            fave=fave_form.data['fave'],
            user_id=current_user.id,
            recipe_id=recipe_id
        )
        
        db.session.add(favorite)
        db.session.commit()

        return jsonify(favorite.to_dict())

    return {'errors': validation_errors_to_error_messages(fave_form.errors)}, 401