import { csrfFetch } from "./csrf";

const LOAD_LIKES = "likes/LOAD_LIKES";
const ADD_LIKE = "likes/ADD_LIKE";
const REMOVE_LIKE = "likes/REMOVE_LIKES";

/* ----- ACTIONS ------ */
const load = (likes) => ({
  type: LOAD_LIKES,
  likes,
});

const add = (like) => ({
  type: ADD_LIKE,
  like,
});

const remove = (like) => ({
  type: REMOVE_LIKE,
  like,
});

/* ------ SELECTORS ------ */

export const getLikes = () => async (dispatch) => {
  const response = await csrfFetch("/api/likes");
  if (response.ok) {
    const likes = await response.json();
    return dispatch(load(likes));
  } else {
    console.log("internal server error");
  }
};

export const addLike = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/likes", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newLike = await response.json();
    dispatch(add(newLike));
  }
  return response;
};

export const deleteLike = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/likes/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
  if (response.ok) {
    const message = await response.json();
    dispatch(remove(response));
    return message;
  }
  return response;
};


const likesReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD_LIKES: {
      newState = { ...state };
      action.likes.forEach((like) => (newState[like.id] = like));
      return newState;
    }
    case ADD_LIKE:
      newState = { ...state };
      newState[action.like.id] = action.like;
      return newState;
    case REMOVE_LIKE:
      newState = { ...state };
      delete newState[action.like];
      return newState;
    default:
      return state;
  }
};

export default likesReducer;
