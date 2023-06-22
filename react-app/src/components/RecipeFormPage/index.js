import React, { useEffect, useState } from "react";
import * as recipeActions from "../../store/recipe";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './RecipeForm.css';


function RecipeFormPage() {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [proteinType, setProteinType] = useState("");
    const [steps, setSteps] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [stepsLink, setStepsLink] = useState("");
    const [recipeImage , setRecipeImage] = useState("");
    const [errors , setErrors] = useState([]);
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRecipe = {
            title: title,
            protein_type: proteinType,
            steps: steps,
            ingredients: ingredients,
            prep_time: prepTime,
            cook_time: cookTime,
            steps_link: stepsLink,
        }
        
        const newImage = {
            image_url: recipeImage,
        }
        
        const createdRecipe = await dispatch(recipeActions.addRecipeThunk(newRecipe, newImage));
        console.log(createdRecipe);

        if(createdRecipe && createdRecipe.errors) {
            setErrors(createdRecipe.errors);
        } else {
            const addRecipe = await dispatch(recipeActions.addRecipeThunk(newRecipe, newImage));
            history.push(`/recipes/my-recipes`);
        }

    }

    return user && (
        <div className="recipe-form">
            <h1>
                Add Your Recipe!    
            </h1>
            {errors.map((error, idx) => (
                <p key={idx}>{error}</p>
            ))}
            <form onSubmit={handleSubmit} className="form-grid">
                <div className="form-item">
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                </div>
                <br/>
                <div className="form-item">
                <label>
                    Protein Type:
                    <select
                        value={proteinType}
                        onChange={(e) => setProteinType(e.target.value)}
                    >
                        <option value="chicken">Chicken</option>
                        <option value="beef">Beef</option>
                        <option value="seafood">Seafood</option>
                        <option value="vegetarian">Vegetarian</option>
                    </select>
                </label>
                </div>
                <br/>
                <div className="form-item">
                <label>
                    Steps:
                    <textarea
                        type="text"
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                    />
                </label>
                </div>
                <br/>
                <div className="form-item">
                <label>
                    Ingredients:
                    <h6>please seperate your ingredients with a comma to ensure display properly</h6>
                    <textarea
                        type="text"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                </label>
                </div>
                <br/>
                <div className="form-item">
                <label>
                    Prep Time:
                    <input
                        type="text"
                        value={prepTime}
                        onChange={(e) => setPrepTime(e.target.value)}
                    />
                </label>
                <label>
                    Cook Time:
                    <input
                        type="text"
                        value={cookTime}
                        onChange={(e) => setCookTime(e.target.value)}
                    />
                </label>
                </div>
                <br/>
                <div className="form-item">
                <label>
                    Steps Link:
                    <input
                        type="text"
                        value={stepsLink}
                        onChange={(e) => setStepsLink(e.target.value)}
                    />
                </label>
                </div>
                <div className="recipe-image">
                <label>
                    Recipe Image:
                    <input
                        type="text"
                        value={recipeImage}
                        onChange={(e) => setRecipeImage(e.target.value)}
                    />
                </label>
                </div>
                <br/>
                <div className="submit-button">
                <button tyope="submit">Submit Your Recipe</button>
                </div>
            </form>

        </div>
    );
}


export default RecipeFormPage