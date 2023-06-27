import React, { useEffect, useState } from "react";
import * as recipeActions from "../../store/recipe";
import * as commentActions from "../../store/comment";
import { useParams } from "react-router-dom";
import  OpenModalButton  from "../OpenModalButton";
import CommentFormComponent from "../CommentFormComponent";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import CommDeleteEditModal from "../CommEditDeleteModal";
import ConfirmCommentDelete from "../ConfirmCommentDelete";

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
        <div>
            <h2>Comments</h2>
            {currUser && addCommentButton()}
            {showCommentForm && <CommentFormComponent setShowCommentForm={setShowCommentForm} />}
            {filteredComments.map((comment) => (
                <div key={comment.id}>
                    <h5>{comment.owner}</h5>
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
                    {currUser && currUser.id === comment.user_id && (
                        <div>
                            <button
                                className="fas fa-ellipsis-h"
                                onClick={() =>
                                    setSelectedCommentId(selectedCommentId === comment.id ? null : comment.id)
                                }
                            />
                            {selectedCommentId === comment.id && (
                                <div>
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
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default RecipeCommentsComponent;
