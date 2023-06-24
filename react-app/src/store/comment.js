const SET_COMMENTS = "comment/SET_COMMENTS";


const initialState = {
    comments: []
}


const setComments = (comments) => ({
    type: SET_COMMENTS,
    payload: comments
})

export const fetchCommmentsThunk = () => async (dispatch) => {
    const response = await fetch('/api/comments');
    if (response.ok) {
        const data = await response.json();
        dispatch(setComments(data));
    }
}

export default function commentReducer(state = initialState, action) {
    let normalizedRecipes = {};
    let newState= {...state};
    switch (action.type) {
        case SET_COMMENTS:
            action.payload.Comments.forEach((comment) => {
                normalizedRecipes[comment.id] = comment;
            })
            newState.comments = normalizedRecipes;
            return newState;
        default:
            return state;
    }
}