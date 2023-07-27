import React from "react";
import {useModal} from "../../context/Modal";

function ConfirmFavoriteDeleteModal(props) {
    const { closeModal } = useModal();
    return (
        <div>
            <h2>Are you sure you want to remove recipe from your favorites?</h2>
            <button>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    );
}


export default ConfirmFavoriteDeleteModal;