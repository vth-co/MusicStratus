import { csrfFetch } from "./csrf";

const LOAD_PROFILE_IMAGE = "images/LOAD_PROFILE_IMAGE";
const LOAD_PROFILE_IMAGES = "images/LOAD_PROFILE__IMAGES";
const ADD_PROFILE_IMAGE = "images/ADD_PROFILE_IMAGE";
const EDIT_PROFILE_IMAGE = 'images/EDIT_PROFILE_IMAGE'
const REMOVE_PROFILE_IMAGE = 'images/REMOVE_PROFILE_IMAGE'

/* ----- ACTIONS ------ */
const load = (profileImage) => ({
    type: LOAD_PROFILE_IMAGE,
    profileImage,
  });


const loadMultiple = (profileImages) => ({
    type: LOAD_PROFILE_IMAGES,
    profileImages,
  });


  const add = (profileImage) => ({
    type: ADD_PROFILE_IMAGE,
    profileImage,
  });
  
  const remove = (profileImage) => ({
    type: REMOVE_PROFILE_IMAGE,
    profileImage,
  });
  
  const edit = (profileImage) => ({
    type: EDIT_PROFILE_IMAGE,
    profileImage,
  })


  /* ------ SELECTORS ------ */

export const getProfileImages = () => async (dispatch) => {
    const response = await csrfFetch("/api/playlists");
    if (response.ok) {
      const images = await response.json();
      return dispatch(load(images));
    } else {
      console.log("internal server error");
    }
  };
  
  export const getProfileImage = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/playlist/${id}`);
  
    if (response.ok) {
      const playlist = await response.json();
      dispatch(load(playlist));
      return playlist;
    }
  }
  
  export const addProfileImage = (payload) => async (dispatch) => {
    const response = await csrfFetch("/api/playlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const playlist = await response.json();
      dispatch(add(playlist));
    }
    return response;
  };
  
  export const deletePlaylist = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/playlists/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const playlist = await response.json();
      dispatch(remove(id));
      return playlist;
    }
    return response;
  };
  
  export const editPlaylist = payload => async dispatch => {
    const response = await csrfFetch(`/api/playlists/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      const playlist = await response.json();
      dispatch(edit(playlist));
      return playlist;
    }
  }
  
  
  const playlistsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
      case LOAD_PLAYLISTS: {
        newState = { ...state };
        action.playlists.forEach((playlist) => (newState[playlist.id] = playlist));
        return newState;
      }
      case ADD_PLAYLIST:
        newState = { ...state };
        newState[action.playlist.id] = action.playlist;
        return newState;
      case EDIT_PLAYLIST:
        newState = { ...state };
        newState[action.playlist.id] = action.playlist;
        return newState;
      case REMOVE_PLAYLIST:
        newState = { ...state };
        delete newState[action.playlist.id];
        return newState;
      default:
        return state;
    }
  };
  
  export default playlistsReducer;
  