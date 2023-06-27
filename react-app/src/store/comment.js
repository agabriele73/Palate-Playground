const SET_COMMENTS = "comment/SET_COMMENTS";
const POST_COMMENT = "comment/POST_COMMENT";
const UPDATE_COMMENT = "comment/UPDATE_COMMENT";
const DELETE_COMMENT = "comment/DELETE_COMMENT";


const initialState = {
    comments: []
}


const setComments = (comments) => ({
    type: SET_COMMENTS,
    payload: comments
})

const postComment = (comment) => ({
    type: POST_COMMENT,
    payload: comment
})

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    payload: commentId
})

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
})

export const fetchCommmentsThunk = () => async (dispatch) => {
    const response = await fetch('/api/comments');
    if (response.ok) {
        const data = await response.json();
        dispatch(setComments(data));
    }
}

export const postCommentThunk = (comment) => async (dispatch) => {
    console.log(comment)
    const response = await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(postComment(data));
    } else {
        const data = await response.json();
        return data
    }
}

export const updateCommentThunk = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateComment(data));
    }
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteComment(data));
    }
}


export default function commentReducer(state = initialState, action) {
    let normalizedRecipes = {};
    let newState= {...state};
    switch (action.type) {
        case SET_COMMENTS:
            action.payload.forEach((comment) => {
                normalizedRecipes[comment.id] = comment;
            })
            newState.comments = normalizedRecipes;
            return newState;
        case POST_COMMENT:
            newState.comments[action.payload.id] = action.payload;
            return newState;
        case UPDATE_COMMENT:
            newState.comments[action.payload.id] = action.payload;
            return newState;
        case DELETE_COMMENT:
            delete newState.comments[action.payload];
            return newState;
        default:
            return state;
    }
}