const SET_RECIPES = "recipe/GET_ALL_RECIPES";
const SET_CURRENT_RECIPE = "recipe/SET_CURRENT_RECIPE";
const ADD_RECIPE = "recipe/ADD_RECIPE";
const EDIT_RECIPE = "recipe/EDIT_RECIPE";
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


const deleteRecipe = (recipeId) => ({
    type: DELETE_RECIPE,
    payload: recipeId
})

const editRecipe = (recipe) => ({
    type: EDIT_RECIPE,
    payload: recipe
})


export const fetchRecipesThunk = () => async (dispatch) => {
    const response = await fetch("/api/recipes");
    if (response.ok) {
        const data = await response.json();
        dispatch(setRecipes(data));
    }
}



export const setCurrentRecipeThunk = (recipe) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipe}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentRecipe(data));
    }
}

export const addRecipeThunk = (recipe) => async (dispatch) => {
    const response = await fetch(`/api/recipes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
    });

    if (!response.ok) {
        const data = await response.json();
        console.error(data);
        return data;
    }

    const recipeData = await response.json();
    console.log(recipeData);


    if (response.ok ) {
        dispatch(addRecipe(recipeData));
    }
};


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

export const editRecipeThunk = (recipe) => async (dispatch) => {
    console.log(recipe)
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
        dispatch(editRecipe(recipeData))

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