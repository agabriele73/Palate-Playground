import React, { useEffect } from "react";
import * as recipeActions from "../../store/recipe";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import EditRecipeForm from "../EditRecipePage";
import ConfirmRecipeDelete from "../ConfirmRecipeDelete";
import './UserRecipes.css'


function UsersRecipesPage() {
    const dispatch = useDispatch();
    const myRecipes = useSelector((state) => state.recipe.recipes);

    const myRecipesArray = Object.values(myRecipes);


    useEffect(() => {
        dispatch(recipeActions.fetchUsersRecipesThunk());
    }, [dispatch]);

    return (
        <div className="user-recipes-container">
            <h1>
                my recipes    
            </h1>
            <div className="recipe-grid">
            {myRecipesArray.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                <NavLink to={`/recipes/${recipe.id}`} className="recipe-link">
                        <img src={recipe.images} alt={recipe.images} />
                        <h4>
                            {recipe.title}
                        </h4>
                </NavLink>
                <div className="edit-delete">
                    <OpenModalButton 
                        buttonText="Delete"
                        className="delete-button"
                        modalComponent={<ConfirmRecipeDelete recipeId={recipe.id} />}
                    />
                    <OpenModalButton
                        buttonText="Edit"
                        className="edit-button"
                        modalComponent={<EditRecipeForm recipeId={recipe.id} />}
                    />
                </div>
            </div>
            ))}      
            </div>
        </div>
    );
}

export default UsersRecipesPage;