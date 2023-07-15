import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as recipeActions from "../../store/recipe";
import { useDispatch, useSelector } from "react-redux";


function SeafoodRecipesPage() {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipe.recipes);
    const recipesArr = Object.values(recipes);

    const seafoodRecipes = recipesArr.filter((recipe) => recipe.protein_type === "seafood");

    useEffect(() => {
        dispatch(recipeActions.fetchRecipesThunk());
    }, [dispatch]);


    return (
        <div>
            <h1>Seafood Recipes</h1>
            <div className="recipe-grid">
            {seafoodRecipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                    <NavLink to={`/recipes/${recipe.id}`} className="recipe-link">
                        <img src={recipe.image} alt={recipe.images} />
                        <h4>
                            {recipe.title}
                        </h4>
                        <h4>
                            recipe by {recipe.owner}
                        </h4>
                        <p>
                            {recipe.steps.slice(0, 100)}...
                        </p>
                    </NavLink>
                </div>
            ))}
            </div>
        </div>

    )
}

export default SeafoodRecipesPage;