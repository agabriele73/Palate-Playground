import React, { useEffect, useState } from "react";
import * as recipeActions from "../../store/recipe";
import * as favoriteActions from "../../store/favorite";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./CurrRecipe.css";
import RecipeCommentsComponent from "../CommentsComponent";
import OpenModalButton from "../OpenModalButton";
import { FaRegHeart, FaHeart }  from "react-icons/fa";
import ConfirmFavoriteModal from "../ConfirmFavoriteModal";
import ConfirmFavoriteDeleteModal from "../ConfirmFavoriteDeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from 'react-icons/fa';




function CurrentRecipePage() {
  const dispatch = useDispatch();
  const { recipe_id } = useParams();
  const currentRecipe = useSelector((state) => state.recipe.currentRecipe);
  const user = useSelector((state) => state.session.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(recipeActions.setCurrentRecipeThunk(recipe_id));
    dispatch(favoriteActions.fetchFavoritesThunk());

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


  const generateStars = (avgRating) => {
    const roundedRating = Math.round(avgRating);
    const stars = []
    for (let i =0; i < 5; i++) {
      const starColor = i < roundedRating ? "#ffc107" : "#e4e5e9";
      stars.push(
        <FaStar key={i} size={30} color={starColor}/>
      )
    }
    return stars;
  };
  

  const display_faved = function () {
    if (user && currentRecipe.fave && currentRecipe.owner_id !== user.id) {
      return (
        <OpenModalButton
          buttonText={<FaHeart style={{ color: "#FEFEFE"}}/>}
          modalComponent={<ConfirmFavoriteDeleteModal faveId={currentRecipe.fave[0].id} recipeId={currentRecipe.id}/>} 
          style={{width: "75px", cursor: "pointer" }}
          className="solid-heart"
        />
      );
    } else if(user && currentRecipe.owner_id !== user.id) {
      return (
        <OpenModalButton
          buttonText={<FaRegHeart style={{ color: "#FEFEFE"}}/>}
          modalComponent={<ConfirmFavoriteModal recipeId={currentRecipe.id}/>}
          style={{ width: "75px", cursor: "pointer" }}
          className="reg-heart"
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
          {/* <div style={{ display: "flex" }} className="favorite-button">
          {display_faved()}
          </div> */}
          <h3 className="recipe-owner">recipe by {currentRecipe.owner}</h3>

          <div className="recipe-info-grid">
            <div>
            <img
              src={currentRecipe.image_url}
              alt={currentRecipe.title}
              className="recipe-img"
            />
            <p style={{ fontSize: "20px", alignItems: "center" }}> Rating: {generateStars(currentRecipe.avg_rating)}</p>
            </div>

            <div className="recipe-video">
            <div style={{ display: "flex", textShadow: "2px 2px 5px 2px #080808",alignItems: "flex-start", justifyContent: "right" }} className="favorite-button">
              {display_faved()}
            </div>
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
