const SET_RATINGS = "ratings/SET_RATINGS";


const initialState = {
    userRatings: []
}

const setRatings = (ratings) => ({
    type: SET_RATINGS,
    payload: ratings
})

export const setRatingsThunk = () => async (dispatch) => {
    const response = await fetch("/api/ratings");
    if (response.ok) {
        const data = await response.json();
        dispatch(setRatings(data));
    }
}

export default function ratingsReducer(state = initialState, action) {
    let newState= {...state};
    switch (action.type) {
        case SET_RATINGS:
            newState.userRatings = action.payload;
            return newState;
        default:
            return state;
    }
}