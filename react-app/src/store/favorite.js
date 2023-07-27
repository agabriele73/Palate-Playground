const SET_FAVORITE = "recipe/SET_FAVORITE";
const POST_FAVORITE = "recipe/POST_FAVORITE";
const DELETE_FAVORITE = "recipe/DELETE_FAVORITE";


const initialState = {
    favorites: []
}


const setFavorites = (favorites) => ({
    type: SET_FAVORITE,
    payload: favorites
})

const postFavorite = (favorite) => ({
    type: POST_FAVORITE,
    payload: favorite
})

const deleteFavorite = (recipeId) => ({
    type: DELETE_FAVORITE,
    payload: recipeId
})

export const fetchFavoritesThunk = () => async (dispatch) => {
    const response = await fetch("/api/favorites");
    if (response.ok) {
        const data = await response.json();
        dispatch(setFavorites(data));
    }
}

export const postFavoriteThunk = (favorite, recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/favorite`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(favorite),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(postFavorite(data));
    }
}

export const deleteFavoriteThunk = (favoriteId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${favoriteId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteFavorite(data));
    }
}


export default function favoriteReducer(state = initialState, action) {
    let newState= {...state};
    let normalizedFavorites = {};
    switch (action.type) {
        case SET_FAVORITE:
            action.payload.Favorites.forEach((favorite) => {
                normalizedFavorites[favorite.id] = favorite;
            })
            newState.favorites = normalizedFavorites;
            return newState;
        case POST_FAVORITE:
            newState.favorites[action.payload.id] = action.payload;
            return newState;
        default:
            return state; 
    }
}
