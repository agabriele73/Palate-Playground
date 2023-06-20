const SET_RECIPES = "recipe/GET_ALL_RECIPES";


const initialState = {
    recipes: [],
}
const setRecipes = (recipes) => ({
    type: SET_RECIPES,
    payload: recipes
})


export const fetchRecipesThunk = () => async (dispatch) => {
    const response = await fetch("/api/recipes");
    if (response.ok) {
        const data = await response.json();
        dispatch(setRecipes(data));
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
        default:
            return state;
    }
}