import React from "react";
import { useDispatch } from "react-redux";
import * as commentActions from "../../store/comment";
import { useModal } from '../../context/Modal';

function ConfirmCommentDelete( { commentId, setSelectedCommentId }) {
    const {  closeModal } = useModal();
    const dispatch = useDispatch();

    // const comments = useSelector((state) => state.comment.comments);
    // const commentToDelete = comments[commentId];

    const handleDelete = async () => {
        const deletingComment = await dispatch(commentActions.deleteCommentThunk(commentId));
        dispatch(commentActions.fetchCommmentsThunk());
        setSelectedCommentId(null);
        closeModal();
    }
    return (
        <div className="confirm-delete">
            <h1>
                Are you sure you want to delete this comment?    
            </h1>
            <button onClick={handleDelete}>
                Delete    
            </button>
            <button onClick={closeModal}>
                Cancel    
            </button>      
        </div>
    );
}

export default ConfirmCommentDelete;