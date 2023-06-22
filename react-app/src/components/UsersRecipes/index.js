import React, { useEffect, useState } from "react";
import * as recipeActions from "../../store/recipe";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


function UsersRecipesPage() {
    const dispatch = useDispatch();
    const myRecipes = useSelector((state) => state.recipe.recipes);

    const myRecipesArray = Object.values(myRecipes);


    useEffect(() => {
        dispatch(recipeActions.fetchUsersRecipesThunk());
    }, [dispatch]);

    return (
        <div>
            <h1>
                my recipes    
            </h1>
            <div className="recipe-grid">
            {myRecipesArray.map((recipe) => (
                <NavLink to={`/recipes/${recipe.id}`} className="recipe-link">
                    <div key={recipe.id} className="recipe-card">
                        <img src={recipe.images[0]} alt={recipe.images} style={{width: "80%", height: "60%"}}/>
                        <h4>
                            {recipe.title}
                        </h4>
                        <h6>
                            recipe by {recipe.owner}
                        </h6>
                    </div>
                </NavLink>
            ))}      
            </div>
        </div>
    );
}

export default UsersRecipesPage;