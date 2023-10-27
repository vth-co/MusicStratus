import { csrfFetch } from "./csrf";

const LOAD_PLAYLISTS = "playlists/LOAD_PLAYLISTS";
const ADD_PLAYLIST = "playlists/ADD_PLAYLIST";
const EDIT_PLAYLIST = "playlists/EDIT_PLAYLIST"
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

const edit = (playlist) => ({
  type: EDIT_PLAYLIST,
  playlist,
})

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

export const getSingle = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlist/${id}`);

  if (response.ok) {
    const playlist = await response.json();
    dispatch(load(playlist));
    return playlist;
  }
}

export const addPlaylist = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/playlists", {
    method: "POST",
    header: { "Content-Type": "application/json" },
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
      delete newState[action.playlist];
      return newState;
    default:
      return state;
  }
};

export default playlistsReducer;
