import { csrfFetch } from "./csrf";

const LOAD_SONGS = "songs/LOAD_SONGS";
const ADD_SONG = "songs/ADD_SONG";
const EDIT_SONG = 'songs/EDIT_SONG'
const REMOVE_SONG = 'songs/REMOVE_SONG'

/* ----- ACTIONS ------ */
const load = (songs) => ({
  type: LOAD_SONGS,
  songs,
});

const add = (song) => ({
  type: ADD_SONG,
  song,
});

const remove = (song) => ({
    type: REMOVE_SONG,
    song
});

const edit = (song) => ({
    type: EDIT_SONG,
    song
})

/* ------ SELECTORS ------ */

export const getSongs = () => async (dispatch) => {
  const response = await csrfFetch("/api/songs");

  if (response.ok) {
    const songs = await response.json();
    return dispatch(load(songs.songs));
  } else {
    console.log("internal server error");
  }
};

export const getSingle = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${id}`);

  if (response.ok) {
    const songs = await response.json();
    dispatch(load(songs));
    return songs;
  }
}

export const addSong = (payload) => async (dispatch) => {
  const response = await csrfFetch("/api/songs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newSong = await response.json();
    dispatch(add(newSong));
  }
  return response;
};

export const deleteSong = songId => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: "DELETE",
        body: JSON.stringify({songId})
    });
    dispatch(remove({ songId }))
    return response;
};

export const editSong = payload => async dispatch => {
    const response = await csrfFetch(`/api/songs/${payload.songId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const editedSong = await response.json();
        dispatch(edit(editedSong));
        return editedSong;
    }
};

const initialState = {
  songs: [],
};

/* ------ REDUCER ------ */
const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SONGS:
      newState = { ...state };
      newState.songs = {};
      action.songs.forEach((song) => (newState.songs[song.id] = song));
      return newState;
    case ADD_SONG:
      newState = { ...state, songs: {...state.songs}};
      newState.songs = {...newState.songs,
        [action.song.id]: action.song,
      };
      return newState;
    case EDIT_SONG:
      newState = {...state, songs: {...state.songs}};
      newState.songs = {...newState.songs,
        [action.song.id]: action.song,
      };
      return newState;
    case REMOVE_SONG:
      newState = {...state, songs: {...state.songs}};
      delete newState.songs[action.song.id];
      return newState;
    default:
      return state;
  }
};

export default songsReducer;
