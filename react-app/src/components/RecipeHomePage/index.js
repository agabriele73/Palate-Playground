import React, { useEffect } from "react";
import * as recipeActions from "../../store/recipe";
import { useDispatch, useSelector } from "react-redux";
import './recipehomepage.css'


function RecipeHomePage() {
    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipe.recipes);
    let slicedRecipes
    
    const recipesArr = Object.values(recipes).slice(0, 3);

    useEffect(() => {
        dispatch(recipeActions.fetchRecipesThunk());
    }, [dispatch]);

    if (recipes.length > 5) {
        const randomIndex = Math.floor(Math.random() * recipesArr.length - 1);
        slicedRecipes = recipesArr.slice(randomIndex, randomIndex + 3);
    } else {
        slicedRecipes = recipesArr;
    }

    return (
        <div className="recipe-homepage">
            <h1>Welcome to Palate PlayGround!</h1>
            <p>
                Welcome to Palate Playground, our recipe-sharing app and friendly community where food lovers come together to share their tasty creations, discover diverse recipes, and connect with each other. 
                Palate Playground provides an easy-to-use platform where users can create and update their own recipes, allowing everyone, from experienced chefs to beginner cooks, to find inspiration in our extensive recipe collection. 
                Engage in lively conversations by leaving comments to share your thoughts, suggestions, and experiences, while also learning from fellow food enthusiasts. Give valuable feedback through our rating system, helping others 
                find the best recipes. Save your favorite recipes with a click, so you can easily access and enjoy them whenever you like. Join us at Palate Playground and experience the joy of sharing, learning, and celebrating the wonderful world of cooking.
            </p>
            <div className="recipe-grid">
                {slicedRecipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <img src={recipe.images[0]} alt={recipe.images} style={{width: "80%", height: "60%", padding:"10px"}}/>
                        <h4>
                            {recipe.title}
                        </h4>
                        <h6>
                            recipe by {recipe.owner}
                        </h6>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecipeHomePage;