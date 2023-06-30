import React, { useEffect } from 'react';
import * as recipeActions from "../../store/recipe";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from '../../context/Modal';
import './ConfirmDeleteRecipe.css';
function ConfirmRecipeDelete({ recipeId }) {
    const dispatch = useDispatch();
    const recipeToDelete = useSelector((state) => state.recipe.currentRecipe);
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(recipeActions.setCurrentRecipeThunk(recipeId));
    }, [dispatch, recipeId]);

    const handleDeleteConfirmation = async (e) => {
        e.preventDefault();
        const data = await dispatch(recipeActions.deleteRecipeThunk(recipeToDelete.id));
        dispatch(recipeActions.fetchUsersRecipesThunk());
        closeModal();
    }

    return (
        <div className="confirm-delete">
            <h1>
                Are you sure you want to delete this recipe?
            </h1>
            <br/>
            <div>
            <button onClick={handleDeleteConfirmation}>
                Yes
            </button>
            <button onClick={closeModal}>
                No
            </button>
            </div>
        </div>
    )
}

export default ConfirmRecipeDelete;