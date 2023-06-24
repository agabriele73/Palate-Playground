import React, { useEffect } from "react";
import * as recipeActions from "../../store/recipe";
import * as commentActions from "../../store/comment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";



function RecipeCommentsComponent() {
    const dispatch = useDispatch();
    const { recipe_id } = useParams();
    const currentRecipe = useSelector((state) => state.recipe.currentRecipe);
    const comments = useSelector((state) => state.comment.comments);

    useEffect(() => {
        dispatch(commentActions.fetchCommmentsThunk());
    }, [dispatch]);

    return (
        <div>
            <h2>
                Comments
            </h2>
        </div>
    )

}


export default RecipeCommentsComponent;