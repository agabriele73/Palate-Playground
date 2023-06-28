import React, { useEffect, useState } from "react";
import * as commentActions from "../../store/comment";
import  OpenModalButton  from "../OpenModalButton";
import CommentFormComponent from "../CommentFormComponent";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import ConfirmCommentDelete from "../ConfirmCommentDelete";
import './Comments.css'

function RecipeCommentsComponent({ recipeId }) {
    const dispatch = useDispatch();
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [commentStates, setCommentStates] = useState({}); // Track individual comment editing states
    const [editedComment, setEditedComment] = useState("");
    const currentRecipe = useSelector((state) => state.recipe.currentRecipe);
    const comments = useSelector((state) => state.comment.comments);
    const commentsArr = Object.values(comments);
    const currUser = useSelector((state) => state.session.user);
    const filteredComments = commentsArr.filter((comment) => comment.recipe_id === recipeId);

    useEffect(() => {
        dispatch(commentActions.fetchCommmentsThunk());
    }, [dispatch]);

    const addCommentButton = () => {
        if ((currentRecipe && currUser) && (currentRecipe.owner_id !== currUser.id)) {
            return (
                <button onClick={() => setShowCommentForm(!showCommentForm)}>
                    Add Comment
                </button>
            );
        }
    };

    const handleOpenEditComment = (commentId) => {
        const comment = comments[commentId];
        setEditedComment(comment.comment);
        setCommentStates((prevState) => ({
            ...prevState,
            [commentId]: true,
        }));
        setSelectedCommentId(null);


    };

    const handleSaveEdit = async (commentId) => {
        const comment = comments[commentId];
        const updatedComment = {...comment, comment: editedComment};
        await dispatch(commentActions.updateCommentThunk(updatedComment));
        dispatch(commentActions.fetchCommmentsThunk());
        setCommentStates((prevState) => ({
            ...prevState,
            [commentId]: false,
        }))
    }

    const handleCancelEdit = (commentId) => {
        setCommentStates((prevState) => ({
            ...prevState,
            [commentId]: false,
        }));
    };

    return (
        <div className="comments-container">
            <h2>Comments</h2>
            <div className="add-comment">
            {currUser && addCommentButton()}
            </div>
            {showCommentForm && <CommentFormComponent setShowCommentForm={setShowCommentForm} />}
            <div className="comments">
            {filteredComments.map((comment) => (
                <div key={comment.id} className="comment">
                    <div className="comment-owner">
                    <h5>comment by: {comment.owner}</h5>
                    </div>
                    {currUser && currUser.id === comment.user_id && (
                        <div>
                            {selectedCommentId === comment.id && (
                                <div className="edit-delete-comment">
                                    <OpenModalButton
                                        buttonText={<FontAwesomeIcon icon={faTrash} />}
                                        modalComponent={
                                            <ConfirmCommentDelete commentId={comment.id} setSelectedCommentId={setSelectedCommentId} />
                                        }
                                    />
                                    <OpenModalButton
                                        buttonText={<FontAwesomeIcon icon={faEdit} />}
                                        onButtonClick={() => handleOpenEditComment(comment.id)}
                                    />
                                </div>
                            )}
                            <div className="comment-options">
                            <button
                                className="fas fa-ellipsis-h"
                                onClick={() =>
                                    setSelectedCommentId(selectedCommentId === comment.id ? null : comment.id)
                                }
                            />
                            </div>
                        </div>
                    )}
                    {commentStates[comment.id] ? (
                        <>
                        <form onSubmit={(e) => handleSaveEdit(comment.id)}>
                            <textarea
                                value={editedComment || comment.comment}
                                onChange={(e) => setEditedComment(e.target.value)}
                            />
                            <button type="submit">save</button>
                            <button onClick={() => handleCancelEdit(comment.id)}>cancel</button>
                        </form>
                        </>
                    ) : (
                        <p>{comment.comment}</p>
                    )}
                </div>
            ))}
            </div>
        </div>
    );
}

export default RecipeCommentsComponent;
