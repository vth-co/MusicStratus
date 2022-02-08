import { csrfFetch } from "./csrf";

const LOAD_SONGS = 'songs/LOAD_SONGS';
// const ADD_SONG = 'songs/addSong'
// const EDIT_SONG = 'songs/editSong'
// const DELETE_SONG = 'songs/deleteSong'

/* ----- ACTIONS ------ */
const loadSongs = (allSongs) => ({
    type: LOAD_SONGS,
    payload: allSongs,
});

// const deleteSong = () => ({
//     type: DELETE_SONG,
// })

/* ------ SELECTORS ------ */

export const getSongs = () => async (dispatch) => {
    const response = await csrfFetch ('/api/songs');

    if (response.ok) {
        const songs = await response.json();
        dispatch(loadSongs(songs.songs));
    }
    return response;
};

const initialState = {
    songs: {}
};


/* ------ REDUCER ------ */
const songsReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_SONGS:
            newState = { ...state };
            action.payload.forEach((song) => newState.songs[song.id] = song)
            return newState;

        default:
            return {...state};
    }
};

export default songsReducer;
