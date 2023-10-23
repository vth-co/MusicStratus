import { csrfFetch } from "./csrf";

const LOAD = "songs/load";
const ADD = "songs/add";
const REMOVE = 'songs/remove'

/* ----- ACTIONS ------ */
const loadLikes = (likes) => ({
    type: LOAD,
    likes,
  });
  
  const addLike = (like) => ({
    type: ADD,
    like,
  });
  
  const removeLike = (like) => ({
      type: REMOVE,
      like,
  });
  

  export const getLikes = () => async dispatch => {
    const response = await csrfFetch("/api/likes");
    if (response.ok) {
        const likes = await response.json();
        return dispatch(loadLikes(likes));
    } else if (response.status < 500 ){
        const data = await response.json();
        return data
    }
  }

  export const createLike = (payload) => async dispatch => {
    const response = await csrfFetch('/api/likes', {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), 
    });
    if (response.ok) {
        const newLike = await response.json();
        dispatch(addLike(newLike));
        return newLike;
    }
    return response;
  }

  export const deleteLike = (id) => async dispatch => {
    const response = await csrfFetch(`/api/likes/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {

        const message = await response.json();
        dispatch(removeLike(response))
        return message;
    }
    return response;
  }

  const likesReducer = (state = {}, action) => {
    let newState;
    switch(action.type) {
        case LOAD:
            newState = {...state};
            action.likes.forEach(like => newState[like.id] = like);
            return newState;
        case ADD:
            newState = {...state};
            newState[action.like.id] = action.like
            return newState;
        case REMOVE:
            newState = {...state};
            delete newState[action.like];
            return newState;
        default:
            return state;
    }
  }

  export default likesReducer;
