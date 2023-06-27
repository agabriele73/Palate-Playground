import React, { useEffect, useState } from "react";
import * as recipeActions from "../../store/recipe";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './EditRecipe.css'



function EditRecipeForm({ recipeId }) {
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
    const currentRecipe = useSelector((state) => state.recipe.currentRecipe);
    const currImage = useSelector((state) => state.recipe.recipeImage);
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(recipeActions.setCurrentRecipeThunk(recipeId));
        dispatch(recipeActions.fetchRecipeImageThunk(recipeId));
    }, [dispatch, recipeId]);

    useEffect(() => {
        if (currentRecipe) {
        setTitle(currentRecipe.title);
        setProteinType(currentRecipe.protein_type);
        setSteps(currentRecipe.steps);
        setIngredients(currentRecipe.ingredients);
        setPrepTime(currentRecipe.prep_time);
        setCookTime(currentRecipe.cook_time);
        setStepsLink(currentRecipe.steps_link);
        setRecipeImage(currentRecipe.images);
        }
    }, [currentRecipe]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateRecipe = {
            id: currentRecipe.id,
            title: title,
            protein_type: proteinType,
            steps: steps,
            ingredients: ingredients,
            prep_time: prepTime,
            cook_time: cookTime,
            steps_link: stepsLink,
        }
        
        const updatedImage = {
            id: currImage.id,
            image_url: recipeImage
        }

        const data = await dispatch(recipeActions.editRecipeThunk(updateRecipe, updatedImage));
        if (data && data.errors) {
            setErrors(data.errors);
            console.log('-----data in edit recipe component', data)
        } else {
            dispatch(recipeActions.fetchUsersRecipesThunk());
            closeModal();

        }
    }

    return (
        <div className="edit-recipe-container">
            <h1>
                Edit Your Recipe?
            </h1>
            {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
            ))}
            <form onSubmit={handleSubmit} className="edit-recipe-grid">
                <div className="edit-form-item">
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    
                </label>
                </div>
                <div className="edit-form-item">
                <label>
                    Protein Type:
                <select
                        value={proteinType}
                        onChange={(e) => setProteinType(e.target.value)}
                        defaultValue={proteinType}
                    >
                        <option value="chicken">Chicken</option>
                        <option value="beef">Beef</option>
                        <option value="seafood">Seafood</option>
                        <option value="vegetarian">Vegetarian</option>
                    </select>
                </label>
                </div>
                <div className="edit-form-item">
                <label>
                    Steps:
                <textarea
                    type="text"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                />
                </label>
                </div>
                <div className="edit-form-item">
                    <label>
                        Ingredients:
                        <textarea
                            type="text"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                    </label>
                </div>
                <div className="edit-form-item">
                    <label>
                        Cook Time:
                    <input
                        type="text"
                        value={cookTime}
                        onChange={(e) => setCookTime(e.target.value)}
                    />
                    </label>
                    <label>
                        Prep Time:
                    <input
                        type="text"
                        value={prepTime}
                        onChange={(e) => setPrepTime(e.target.value)}
                    />
                    </label>
                </div>
                <div className="edit-form-item">
                <label>
                    Steps Link:
                <input
                    type="text"
                    value={stepsLink}
                    onChange={(e) => setStepsLink(e.target.value)}
                />
                </label>
                </div>
                <div className="edit-image">
                    <label>
                        Image:
                    <input
                        type="text"
                        value={recipeImage}
                        onChange={(e) => setRecipeImage(e.target.value)}
                    />
                    </label>
                </div>
                <div className="edit-submit-button">    
                    <button type="submit">Submit</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            </form>
            </div>
    )
}


export default EditRecipeForm;