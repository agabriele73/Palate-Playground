from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.forms import RecipeForm, RecipeImageForm
from app.models import Recipe, RecipeImage, User, db

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
        recipe_images = RecipeImage.query.filter_by(recipe_id=recipe.id).all()
        image_urls = [ image.image_url for image in recipe_images]
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
            'images': image_urls,
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
        recipe_images = RecipeImage.query.filter_by(recipe_id=recipe.id).all()
        image_urls = [ image.image_url for image in recipe_images]
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
            'images': image_urls,
            'owner': owner
        }

        recipe_data.append(recipe_dict)
    return jsonify({"Recipes": recipe_data})


@recipe_routes.route('/<int:recipe_id>', methods=['GET'])
def get_recipe_byId(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    recipe_images = RecipeImage.query.filter_by(recipe_id=recipe.id).all()
    image_urls = [ image.image_url for image in recipe_images]
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
        'images': image_urls,
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
            steps_link=form.data['steps_link']
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

    if form.validate_on_submit():
        recipe = Recipe.query.get(recipe_id)

        if not recipe:
            return jsonify({'message': 'Recipe not found'}), 404
        
        if recipe.owner_id != current_user.id:
            return jsonify({'message': 'You do not own this recipe'}), 401
        
        recipe.title = form.data['title']
        recipe.protein_type = form.data['protein_type']
        recipe.steps = form.data['steps']
        recipe.ingredients = form.data['ingredients']
        recipe.prep_time = form.data['prep_time']
        recipe.cook_time = form.data['cook_time']
        recipe.steps_link = form.data['steps_link']

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

@recipe_routes.route('/<int:recipe_id>/images', methods=['POST', 'GET'])
@login_required
def add_recipe_image(recipe_id):
    form = RecipeImageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    recipe = Recipe.query.get(recipe_id)

    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404
    
    if recipe.owner_id != current_user.id:
        return jsonify({'message': 'You do not own this recipe'}), 401

    if form.validate_on_submit():

        image = RecipeImage(
            recipe_id=recipe_id,
            image_url=form.data['image_url']
        )

        db.session.add(image)
        db.session.commit()

        return jsonify(image.to_dict())
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

