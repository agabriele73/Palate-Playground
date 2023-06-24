from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Recipe, RecipeImage, User, Comment, db
from app.forms import  CommentForm

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@comment_routes.route('', methods=['GET'])
def get_comments():
    comments = Comment.query.all()

    comments_data = []
    for comment in comments:
        user_posts = User.query.filter_by(id=comment.user_id).all()
        user = [ user.username for user in user_posts]

        comment_dict = {
            'id': comment.id,
            'user_id': comment.user_id,
            'recipe_id': comment.recipe_id,
            'comment': comment.comment,
            'owner': user
        }

        comments_data.append(comment_dict)
    
    return jsonify(comments_data)

@comment_routes.route('', methods=['POST', 'GET'])
@login_required
def add_comment():
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    comment_data = []
    if form.validate_on_submit():

        comment = Comment(
            comment=form.data['comment'],
            recipe_id=form.data['recipe_id'],
            user_id=current_user.id
        )
        user = User.query.get(current_user.id)

        db.session.add(comment)
        db.session.commit()

        comment_dict = {
            'id': comment.id,
            'user_id': comment.user_id,
            'recipe_id': comment.recipe_id,
            'comment': comment.comment,
            'owner': user.username
        }
        comment_data.append(comment_dict)

        return jsonify(comment_data[0]), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
@comment_routes.route('/<int:comment_id>', methods=['GET'])
def get_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if not comment:
        return jsonify({'message': 'Comment not found'}), 404
    
    return jsonify(comment.to_dict())


@comment_routes.route('/<int:comment_id>', methods=['GET', 'PUT'])
@login_required
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if not comment:
        return jsonify({'message': 'Comment not found'}), 404
    
    if comment.user_id != current_user.id:
        return jsonify({'message': 'You do not own this comment'}), 401
    
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment.comment = form.data['comment']
        db.session.commit()
        return jsonify(comment.to_dict())
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):

    comment = Comment.query.get(comment_id)

    if not comment:
        return jsonify({'message': 'Comment not found'}), 404
    
    if comment.user_id != current_user.id:
        return jsonify({'message': 'You do not own this comment'}), 401
    
    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted'}), 200

