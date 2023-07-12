const SET_RECIPES = "recipe/GET_ALL_RECIPES";
const SET_CURRENT_RECIPE = "recipe/SET_CURRENT_RECIPE";
const SET_RECIPE_IMAGE = "recipe/SET_RECIPE_IMAGE";
const ADD_RECIPE = "recipe/ADD_RECIPE";
const ADD_RECIPE_IMAGE = "recipe/ADD_RECIPE_IMAGE";
const EDIT_RECIPE = "recipe/EDIT_RECIPE";
const EDIT_RECIPE_IMAGW = "recipe/EDIT_RECIPE_IMAGE";
const DELETE_RECIPE = "recipe/DELETE_RECIPE";



const initialState = {
    recipes: [],
    currentRecipe: null,
    newRecipe: null,
    recipeImage: null
}
const setRecipes = (recipes) => ({
    type: SET_RECIPES,
    payload: recipes
})

const setCurrentRecipe = (recipe) => ({
    type: SET_CURRENT_RECIPE,
    payload: recipe
})

const addRecipe = (recipe) => ({
    type: ADD_RECIPE,
    payload: recipe
})

const addImage = (recipeId, image) => ({
    type: ADD_RECIPE_IMAGE,
    payload: {
        recipeId,
        image
    }
})

const deleteRecipe = (recipeId) => ({
    type: DELETE_RECIPE,
    payload: recipeId
})

const editRecipe = (recipe) => ({
    type: EDIT_RECIPE,
    payload: recipe
})

const editImage = (recipeId, image) => ({
    type: EDIT_RECIPE_IMAGW,
    payload: {
        recipeId,
        image
    }
})

const setRecipeImage = (image) => ({
    type: SET_RECIPE_IMAGE,
    payload: image
})


export const fetchRecipesThunk = () => async (dispatch) => {
    const response = await fetch("/api/recipes");
    if (response.ok) {
        const data = await response.json();
        dispatch(setRecipes(data));
    }
}

export const fetchRecipeImageThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/images`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setRecipeImage(data));
    }
}

export const setCurrentRecipeThunk = (recipe) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipe}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentRecipe(data));
    }
}

export const addRecipeThunk = (recipe, image) => async (dispatch) => {
    try {
        const response = await fetch(`/api/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe),
        })

        if (!response.ok) {
            const data = await response.json();
            return data
        }

        const recipeData = await response.json();
        console.log(recipeData)
        const recipeId = recipeData.id

        const imageResponse = await fetch(`/api/recipes/${recipeId}/images`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(image),
        })

        if (!imageResponse.ok) {
            const data = await imageResponse.json();
            return data
        }

        const imageData = await imageResponse.json();

        dispatch(addRecipe(recipeData))

        dispatch(addImage(recipeId, imageData))
    } catch (error) {
        console.error(error);
    }
}

export const fetchUsersRecipesThunk = () => async (dispatch) => {
    const response = await fetch("/api/recipes/my-recipes");
    if (response.ok) {
        const data = await response.json();
        dispatch(setRecipes(data));
    }
}

export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "DELETE",
    });
    if(response.ok) {
        dispatch(deleteRecipe(recipeId));
    }

}

export const editRecipeThunk = (recipe, image) => async (dispatch) => {
    console.log(recipe, image)
    try {
        const response = await fetch(`/api/recipes/${recipe.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe),
        })

        if (!response.ok) {
            const data = await response.json();
            return data
        }

        const recipeData = await response.json();
        console.log(recipeData)
        const recipeId = recipeData.id

        const imageResponse = await fetch(`/api/recipes/${recipeId}/images/${image.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(image),
        })

        if (!imageResponse.ok) {
            const data = await imageResponse.json();
            return data
        }

        const imageData = await imageResponse.json();

        dispatch(editRecipe(recipeData))
        dispatch(editImage(recipeId, imageData.image_url))

    } catch (error) {
        console.error(error);
    }
}

export default function recipeReducer(state = initialState, action) {
    let normalizedRecipes = {};
    let newState= {...state};
    switch (action.type) {
        case SET_RECIPES:
            action.payload.Recipes.forEach((recipe) => {
                normalizedRecipes[recipe.id] = recipe;
            })
            newState.recipes = normalizedRecipes;
            return newState;
        case SET_CURRENT_RECIPE:
            newState.currentRecipe = action.payload;
            return newState;
        case ADD_RECIPE:
            newState.newRecipe = action.payload;
            return newState;
        case SET_RECIPE_IMAGE:
            newState.recipeImage = action.payload;
            return newState;
        case ADD_RECIPE_IMAGE:
            newState.recipeImage = action.payload;
            return newState;
        case EDIT_RECIPE:
            newState.currentRecipe = action.payload;
            return newState;
        case DELETE_RECIPE:
            delete newState.recipes[action.payload];
            return newState;
        default:
            return state;
    }
}