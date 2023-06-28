import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from "../../store/comment";
import './CommentForm.css';

function CommentFormComponent({ setShowCommentForm }) {
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);
    const currentRecipeId = useSelector((state) => state.recipe.currentRecipe.id);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

    const newComment = {
        comment: comment,
        recipe_id: currentRecipeId,
    };

    try {
        const data = await dispatch(commentActions.postCommentThunk(newComment));
        if (data && data.errors) {
            setErrors(data.errors);
        } else {
            setComment("");
            setShowCommentForm(false);
        }
        } catch (error) {
        console.log("Error posting comment:", error);
    
        }
    };

    const handleDisabled = () => {
        if (comment === "") {
            return true;
        }
    }

    return (
        <div className="comment-form-container">
            <h5>Post your comment and let us know what you think!</h5>
            <form onSubmit={handleSubmit}>
            {errors.map((error, idx) => (
                <p key={idx}>{error}</p>
            ))}
                <textarea
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <div className="comment-button-container">
                    <button type="submit" disabled={handleDisabled()}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default CommentFormComponent;
