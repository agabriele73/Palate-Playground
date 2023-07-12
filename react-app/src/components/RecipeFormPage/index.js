import React, { useState } from "react";
import * as recipeActions from "../../store/recipe";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AWS from "aws-sdk";
import './RecipeForm.css';


const awsAccessKey = process.env.REACT_APP_AWS_ACCESS_KEY
const awsSecretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY

AWS.config.update({
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey,
    region: "us-west-1"
})


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
    let newImage
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("awsSecretAccessKey", awsSecretAccessKey);
        console.log("awsAccessKey", awsAccessKey);

        const s3 = new AWS.S3();

        const imageKey = `recipe-images/${Date.now()}-${recipeImage}`;
        const s3Params = {
            Bucket: "palateplaygroundbucket2",
            Key: imageKey,
            Body: recipeImage,
            // ACL: "public-read",
        };
        try {
        await s3.upload(s3Params).promise();

        const imageUrl = `http://palateplaygroundbucket2.s3-website-us-west-1.amazonaws.com/${imageKey}`;
        const newRecipe = {
            title: title,
            protein_type: proteinType,
            steps: steps,
            ingredients: ingredients,
            prep_time: prepTime,
            cook_time: cookTime,
            steps_link: stepsLink,
        }
        
        if (imageUrl) {
            setRecipeImage(imageUrl);
            newImage = {
            image_url: imageUrl,
        }
        } else {
            newImage = {
                image_url: recipeImage,
            }
        }
        
        const createdRecipe = await dispatch(recipeActions.addRecipeThunk(newRecipe, newImage));
        console.log(createdRecipe);

        if(createdRecipe && createdRecipe.errors) {
            setErrors(createdRecipe.errors);
        } else {
            history.push(`/recipes/my-recipes`);
        }
        } catch (err) {
            console.log(err);
        }

    }

    const handleDisabled = () => {
        if (title === "" || proteinType === "" || steps === "" || ingredients === "" || prepTime === "" || cookTime === "" || stepsLink === "") {
            return true;
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
                        <option value="" disabled>Please make a selection...</option>
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
                    {/* <input
                        type="text"
                        value={recipeImage}
                        onChange={(e) => setRecipeImage(e.target.value)}
                    />  */}
                    <input
                        className="file-upload"
                        type="file"
                        onChange={(e) => setRecipeImage(e.target.files[0])}
                    />
                </label>
                </div>
                <br/>
                <div className="submit-button">
                <button type="submit" disabled={handleDisabled()}>Submit Your Recipe</button>
                </div>
            </form>

        </div>
    );
}


export default RecipeFormPage