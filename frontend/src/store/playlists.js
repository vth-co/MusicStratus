import { csrfFetch } from "./csrf";

const LOAD_PLAYLISTS = "playlists/LOAD_PLAYLISTS";
const ADD_PLAYLIST = "playlists/ADD_PLAYLIST";
const REMOVE_PLAYLIST = "playlists/REMOVE_PLAYLIST";

/* ----- ACTIONS ------ */
const load = (playlists) => ({
  type: LOAD_PLAYLISTS,
  playlists,
});

const add = (playlist) => ({
  type: ADD_PLAYLIST,
  playlist,
});

const remove = (playlist) => ({
  type: REMOVE_PLAYLIST,
  playlist,
});

/* ------ SELECTORS ------ */

export const getPlaylists = () => async (dispatch) => {
  const response = await csrfFetch("/api/playlists");
  if (response.ok) {
    const playlists = await response.json();
    return dispatch(load(playlists));
  } else {
    console.log("internal server error");
  }
};

export const addPlaylist = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/playlists", {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newPlaylist = await response.json();
    dispatch(add(newPlaylist));
  }
  return response;
};

export const deletePlaylist = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const message = await response.json();
    dispatch(remove(id));
    return message;
  }
  return response;
};


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
    case REMOVE_PLAYLIST:
      newState = { ...state };
      delete newState[action.playlist];
      return newState;
    default:
      return state;
  }
};

export default playlistsReducer;
