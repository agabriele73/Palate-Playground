import React from "react";
import {useModal} from "../../context/Modal";
import {useDispatch} from "react-redux";
import * as ratingActions from "../../store/rating";


function ConfirmRatingDeleteModal({ ratingId }) {
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const handleDelete = async () => {
        await dispatch(ratingActions.deleteRatingThunk(ratingId));
        dispatch(ratingActions.setRatingsThunk());
        closeModal();
    }

    return (
        <div className="confirm-delete">
            <h2>Are you sure you want to remove your rating?</h2>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    );
}


export default ConfirmRatingDeleteModal;