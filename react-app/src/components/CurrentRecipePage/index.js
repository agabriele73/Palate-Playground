import React, { useEffect } from "react";
import * as recipeActions from "../../store/recipe";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CurrRecipe.css"
import RecipeCommentsComponent from "../CommentsComponent";



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
            <ol className="recipe-ingredients">
                {ingredientsArr.map((ingredient, index) => (
                    <li key={ingredient}>{ingredient}</li>

                ))}
            </ol>
        )
    }

    // function getYouTubeVideoId(url) {
    //     const regex = /(?:youtube.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|[^#]*[?&]v=|youtu.be\/|[^#]+\?(?:.*&)?v=)([^&#?]{11}))/i;
    //     const match = url.match(regex);
    //     return match && match[1];
    // }

    return currentRecipe && currentRecipe.steps_link ? (
        <>

        <div className="currentrecipe-container">
            <h1 className="recipe-title">{currentRecipe.title}</h1>
            <h3 className="recipe-owner">recipe by {currentRecipe.owner}</h3>

            <div className="recipe-info-grid">
                <img src={currentRecipe.image_url} alt={currentRecipe.title} className="recipe-img"/>
                <div className="recipe-video">
                <h3>follow along: </h3>
                <iframe
                    width="560"
                    height="315"
                    src={currentRecipe.steps_link}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
                <div className="recipe-steps">
                <div className="recipe-times">
                    <div>
                        <h3>prep time: </h3>
                        {currentRecipe.prep_time}
                    </div>
                    <div>
                        <h3>cook time: </h3>
                        {currentRecipe.cook_time}
                    </div>
                </div>
                    <h3>steps: </h3>
                    <p>
                        {currentRecipe.steps}
                    </p>
                </div>
                <div className="recipe-ingredients">
                    <h3>ingredients: </h3>
                    {ingredientsList()}
                </div>
                <div className="recipe-social" style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                    <i className="fa-brands fa-instagram" style={{color: "black", fontSize: "60px", cursor: "pointer"}}></i>
                    <i className="fa-brands fa-twitch" style={{color: "black", fontSize: "60px", cursor: "pointer"}}></i>
                </div>
            </div>
        </div>
            <RecipeCommentsComponent recipeId={currentRecipe.id}/>
        </>
    ) : (
        <h1>Loading...</h1>
    )
}


export default CurrentRecipePage