import { csrfFetch } from "./csrf";

const LOAD_FILES = "files/LOAD_FILES";
const ADD_FILE = "files/ADD_FILE";
const EDIT_FILE = 'files/EDIT_FILE'
const REMOVE_FILE = 'files/REMOVE_FILE'

/* ----- ACTIONS ------ */
const load = (files) => ({
    type: LOAD_FILES,
    files,
  });
  
  const add = (file) => ({
    type: ADD_FILE,
    file,
  });
  
  const remove = (file) => ({
      type: REMOVE_FILE,
      file,
  });
  
  const edit = (file) => ({
      type: EDIT_FILE,
      file,
  })
  
/* ------ SELECTORS ------ */

export const getFiles = () => async (dispatch) => {
    const response = await csrfFetch("/api/files");
  
    if (response.ok) {
      const files = await response.json();
      return dispatch(load(files.files));
    } else {
      console.log("internal server error");
    }
  };
  
  export const getSingle = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/files/${id}`);
  
    if (response.ok) {
      const files = await response.json();
      dispatch(load(files));
      return files;
    }
  }
  
  export const addFile = (payload) => async (dispatch) => {
    const response = await csrfFetch("/api/files", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const newFile = await response.json();
      dispatch(add(newFile));
    }
    return response;
  };
  
  export const deleteFile = fileID => async dispatch => {
      const response = await csrfFetch(`/api/files/${fileID}`, {
          method: "DELETE",
          body: JSON.stringify({fileID})
      });
      dispatch(remove(response))
      return response;
  };
  
  export const editFile = payload => async dispatch => {
      const response = await csrfFetch(`/api/files/${payload.fileID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
      });
      if (response.ok) {
          const editedFile = await response.json();
          dispatch(edit(editedFile));
          return editedFile;
      }
  };
  
  const initialState = {
    files: [],
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
  