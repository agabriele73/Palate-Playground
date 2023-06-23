import React, { useEffect, useState } from "react";
import * as recipeActions from "../../store/recipe";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";



function EditRecipeForm({ recipeId }) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [proteinType, setProteinType] = useState("");
    const [steps, setSteps] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [stepsLink, setStepsLink] = useState("");
    const [errors , setErrors] = useState([]);
    const currentRecipe = useSelector((state) => state.recipe.currentRecipe);
    const { closeModal } = useModal();

    useEffect(() => {
        dispatch(recipeActions.setCurrentRecipeThunk(recipeId));
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

        const data = await dispatch(recipeActions.editRecipeThunk(updateRecipe));
        if (data) {
            setErrors(data.errors);
        } else {
            dispatch(recipeActions.fetchUsersRecipesThunk());
            closeModal();

        }
    }

    return (
        <div>
            <h1>
                Edit Your Recipe?
            </h1>
            {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
            ))}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <select
                        value={proteinType}
                        onChange={(e) => setProteinType(e.target.value)}
                    >
                        <option value="chicken">Chicken</option>
                        <option value="beef">Beef</option>
                        <option value="seafood">Seafood</option>
                        <option value="vegetarian">Vegetarian</option>
                    </select>
                <input
                    type="text"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                />
                <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
                <input
                    type="text"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                />
                <input
                    type="text"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                />
                <input
                    type="text"
                    value={stepsLink}
                    onChange={(e) => setStepsLink(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default EditRecipeForm;