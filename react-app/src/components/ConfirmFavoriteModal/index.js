import React from "react";
import {useModal} from "../../context/Modal";

function ConfirmFavoriteModal(props) {
    const { closeModal } = useModal();
    return (
        <form>
            <h2>Are you sure you want to add recipe to your favorites?</h2>
            <button type="submit">Yes</button>
            <button onClick={closeModal}>No</button>
        </form>
    );
}


export default ConfirmFavoriteModal;