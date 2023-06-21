const SET_RECIPES = "recipe/GET_ALL_RECIPES";
const SET_CURRENT_RECIPE = "recipe/SET_CURRENT_RECIPE";



const initialState = {
    recipes: [],
    currentRecipe: null
}
const setRecipes = (recipes) => ({
    type: SET_RECIPES,
    payload: recipes
})

const setCurrentRecipe = (recipe) => ({
    type: SET_CURRENT_RECIPE,
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
        default:
            return state;
    }
}