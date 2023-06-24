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
    return jsonify({"Comments": [comment.to_dict() for comment in comments]})


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

