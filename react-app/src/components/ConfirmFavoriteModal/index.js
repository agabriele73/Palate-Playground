import React from "react";
import {useModal} from "../../context/Modal";
import {useSelector, useDispatch} from "react-redux";
import * as favoriteActions from "../../store/favorite";
import * as recipeActions from "../../store/recipe";

function ConfirmFavoriteModal({ recipeId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFavorite = {
            fave: true,
        }
        const data = await dispatch(favoriteActions.postFavoriteThunk(newFavorite ,recipeId));
        dispatch(recipeActions.setCurrentRecipeThunk(recipeId));
        dispatch(favoriteActions.fetchFavoritesThunk());

        closeModal();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Are you sure you want to add recipe to your favorites?</h2>
            <button type="submit">Yes</button>
            <button onClick={closeModal}>No</button>
        </form>
    );
}


export default ConfirmFavoriteModal;