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
    const [showEditDelteModal, setShowEditDeleteModal] = useState(false);
    const currentRecipe = useSelector((state) => state.recipe.currentRecipe);
    const comments = useSelector((state) => state.comment.comments);
    const commentsArr = Object.values(comments);
    const currUser = useSelector((state) => state.session.user);
    const filteredComments = commentsArr.filter((comment) => comment.recipe_id === recipeId);

    useEffect(() => {
        dispatch(commentActions.fetchCommmentsThunk());
    }, [dispatch]);

    const addCommentButton = () => {
        if ((currentRecipe && currUser)  && (currentRecipe.owner_id !== currUser.id)){
            return (
                        <button onClick={() => setShowCommentForm(!showCommentForm)}>
                                Add Comment
                        </button>
            )
        }
    }

    
    return (
        <div>
            <h2>
                Comments
            </h2>
            {currUser && addCommentButton()}
            {showCommentForm && (
                <CommentFormComponent setShowCommentForm={setShowCommentForm} />
            )} 
            {filteredComments.map((comment) => (
                <div key={comment.id}>
                    <h5>{comment.owner}</h5>
                    <p>
                        {comment.comment}
                    </p>
                    {currUser && currUser.id === comment.user_id &&
                        <div>
                            <button
                                className="fas fa-ellipsis-h"
                                onClick={() => setShowEditDeleteModal(!showEditDelteModal)}
                            />
                            {showEditDelteModal &&
                                <div>
                                <OpenModalButton 
                                    buttonText={<FontAwesomeIcon icon={faTrash} />}
                                    modalComponent={<ConfirmCommentDelete commentId={comment.id}/>}
                                />
                                <OpenModalButton  
                                    buttonText={<FontAwesomeIcon icon={faEdit} />}
                                />
                                </div>
                            }
                        </div>
                    }
                </div>
            ))}
        </div>
    )

}


export default RecipeCommentsComponent;