import React, { useEffect, useState } from "react";
import * as recipeActions from "../../store/recipe";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CurrRecipe.css";
import RecipeCommentsComponent from "../CommentsComponent";
import OpenModalButton from "../OpenModalButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegHeart, FaHeart }  from "react-icons/fa";

function CurrentRecipePage() {
  const dispatch = useDispatch();
  const { recipe_id } = useParams();
  const currentRecipe = useSelector((state) => state.recipe.currentRecipe);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(recipeActions.setCurrentRecipeThunk(recipe_id));
  }, [dispatch, recipe_id]);

  const ingredientsList = function () {
    const ingredientsArr = currentRecipe.ingredients.split(/,(?![^\s,]+)/);

    return (
      <ol className="recipe-ingredients">
        {ingredientsArr.map((ingredient, index) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ol>
    );
  };

  const display_faved = function () {
    if (currentRecipe.fave) {
      return (
        <OpenModalButton
          buttonText={<FaHeart/>} 
          style={{ color: "red", background: "none", width: "50px" }}
        />
      );
    } else {
      return (
        <OpenModalButton
          buttonText={<FaRegHeart/>}
          style={{ color: "red", background: "none", width: "50px" }}
        />
      );
    }
  }

  useEffect(() => {
    if (currentRecipe) {
      setIsLoading(false);
    }
  }, [currentRecipe]);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="currentrecipe-container">
          <h1 className="recipe-title">{currentRecipe.title}</h1>
          <div style={{ display: "flex" }}>
          {display_faved()}
          </div>
          <h3 className="recipe-owner">recipe by {currentRecipe.owner}</h3>

          <div className="recipe-info-grid">
            <img
              src={currentRecipe.image_url}
              alt={currentRecipe.title}
              className="recipe-img"
            />
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
              <p>{currentRecipe.steps}</p>
            </div>
            <div className="recipe-ingredients">
              <h3>ingredients: </h3>
              {ingredientsList()}
            </div>
          </div>
          <RecipeCommentsComponent recipeId={currentRecipe.id} />
        </div>
      )}
    </>
  );
}

export default CurrentRecipePage;
