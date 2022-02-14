import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = "comments/LOAD_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENTS";
const EDIT_COMMENT = "comments/EDIT_COMMENTS";
const REMOVE_COMMENT = "comments/REMOVE_COMMENTS";

/* ----- ACTIONS ------ */
const load = (comments) => ({
  type: LOAD_COMMENTS,
  comments,
});

const add = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

const remove = (comment) => ({
  type: REMOVE_COMMENT,
  comment,
});

const edit = (comment) => ({
  type: EDIT_COMMENT,
  comment,
});

/* ------ SELECTORS ------ */

export const getComments = () => async (dispatch) => {
  const response = await csrfFetch("/api/comments");

  if (response.ok) {
    const comments = await response.json();

    return dispatch(load(comments));
  }
};

export const addComment = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments`, {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newComment = await response.json();
    dispatch(add(newComment));
  }
  return response;
};

export const deleteComment = payload => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${payload.commentId}`, {
    method: "DELETE",
    body: JSON.stringify({ payload }),
  });
  dispatch(remove(payload.commentId));
  return response;
};

export const editComment = payload => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${payload.commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const editedComment = await response.json();
    dispatch(edit(editedComment));
    return editedComment;
  }
};

const initialState = {
  comments: [],
};

/* ------ REDUCER ------ */
const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_COMMENTS:
      newState = { ...state };
      newState.comments = {};
      action.comments.forEach(
        (comment) => (newState.comments[comment.id] = comment)
      );
      return newState;
    case ADD_COMMENT:
      newState = { ...state };
      newState.comments = {
        ...newState.comments,
        [action.comment.id]: action.comment,
      };
      return newState;
    case REMOVE_COMMENT:
      newState = { ...state, comments: {...state.comments}};
      delete newState.comments[action.comment];
      return newState;
    case EDIT_COMMENT:
      newState = { ...state };
      newState.comments = {
        ...newState.comments,
        [action.comment.id]: action.comment,
      };
      return newState;
    default:
      return state;
  }
};

export default commentsReducer;
