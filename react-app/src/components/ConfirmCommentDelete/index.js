import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from "../../store/comment";
import { useModal } from '../../context/Modal';

function ConfirmCommentDelete( { commentId }) {
    const {  closeModal } = useModal();

    return (
        <>
            <h1>
                Are you sure you want to delete this comment?    
            </h1>
            <button>
                Delete    
            </button>
            <button onClick={closeModal}>
                Cancel    
            </button>      
        </>
    );
}

export default ConfirmCommentDelete;