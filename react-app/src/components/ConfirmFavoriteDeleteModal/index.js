import React from "react";
import {useModal} from "../../context/Modal";
import {useDispatch} from "react-redux";
import * as favoriteActions from "../../store/favorite";
import * as recipeActions from "../../store/recipe";

function ConfirmFavoriteDeleteModal({ faveId, recipeId }) {
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const handleDelete = async () => {
        const deletingFave = await dispatch(favoriteActions.deleteFavoriteThunk(faveId));
        dispatch(recipeActions.setCurrentRecipeThunk(recipeId));
        dispatch(favoriteActions.fetchFavoritesThunk());
        closeModal();
    }

    return (
        <div>
            <h2>Are you sure you want to remove recipe from your favorites?</h2>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    );
}


export default ConfirmFavoriteDeleteModal;