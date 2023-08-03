const SET_RATINGS = "ratings/SET_RATINGS";
const POST_RATING = "ratings/POST_RATING";
const DELETE_RATING = "ratings/DELETE_RATING";


const initialState = {
    userRatings: []
}

const setRatings = (ratings) => ({
    type: SET_RATINGS,
    payload: ratings
})

const postRating = (rating) => ({
    type: POST_RATING,
    payload: rating
})

const deleteRating = (rating) => ({
    type: DELETE_RATING,
    payload: rating
})

export const setRatingsThunk = () => async (dispatch) => {
    const response = await fetch("/api/ratings");
    if (response.ok) {
        const data = await response.json();
        dispatch(setRatings(data));
    }
}

export const postRatingThunk = (rating, recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/rating`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rating),
    });
    console.log(response)
    if (response.ok) {
        const data = await response.json();
        dispatch(postRating(data));
    }
}

export const deleteRatingThunk = (ratingId) => async (dispatch) => {
    const response = await fetch(`/api/ratings/${ratingId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteRating(ratingId));

    }
}

export default function ratingsReducer(state = initialState, action) {
    let newState= {...state};
    let normalizedRatings = {};
    switch (action.type) {
        case SET_RATINGS:
            action.payload.Ratings.forEach((rating) => {
                normalizedRatings[rating.id] = rating;
            })
            newState.userRatings = normalizedRatings;
            return newState;
        case POST_RATING:
            newState.userRatings[action.payload.id] = action.payload;
            return newState;
        case DELETE_RATING:
            delete newState.userRatings[action.payload];
            return newState;
        default:
            return state;
    }
}