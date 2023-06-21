import React, { useEffect } from "react";
import * as recipeActions from "../../store/recipe";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



function CurrentRecipePage() {
    const dispatch = useDispatch();
    const { recipe_id } = useParams();
    const currentRecipe = useSelector((state) => state.recipe.currentRecipe);
    
    useEffect(() => {
        dispatch(recipeActions.setCurrentRecipeThunk(recipe_id));
    }, [dispatch, recipe_id]);

    const ingredientsList = function() {
        const ingredientsArr = currentRecipe.ingredients.split(", ");

        return (
            <ul className="recipe-ingredients">
                {ingredientsArr.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>

                ))}
            </ul>
        )
    }

    function getYouTubeVideoId(url) {
        const regex = /(?:youtube.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|[^#]*[?&]v=|youtu.be\/|[^#]+\?(?:.*&)?v=)([^&#?]{11}))/i;
        const match = url.match(regex);
        return match && match[1];
    }

    return currentRecipe ? (
        <div className="currentrecipe-container">
            <h1>{currentRecipe.title}</h1>
            <h3>recipe by {currentRecipe.owner}</h3>
            <img src={currentRecipe.images[0]} alt={currentRecipe.title} />
            <div className="recipe-steps">
                <h4>steps: </h4>
                <p>
                    {currentRecipe.steps}
                </p>
            </div>
            <div className="recipe-times">
                <h4>prep time: </h4>
            <p>
                {currentRecipe.prep_time}
            </p>
            <h4>cook time: </h4>
            <p>
                {currentRecipe.cook_time}
            </p>
            </div>
            <div className="recipe-ingredients">
                <h4>ingredients: </h4>
                {ingredientsList()}
            </div>
            <div>
                <h4>link: </h4>
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentRecipe.steps_link)}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

        </div>
    ) : (
        <h1>Loading...</h1>
    )
}


export default CurrentRecipePage