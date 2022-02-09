import { csrfFetch } from "./csrf";

const LOAD_SONGS = 'songs/LOAD_SONGS';
// const ADD_SONG = 'songs/addSong'
// const EDIT_SONG = 'songs/editSong'
// const DELETE_SONG = 'songs/deleteSong'

/* ----- ACTIONS ------ */
const loadSongs = (songs) => ({
    type: LOAD_SONGS,
    songs
});

// const deleteSong = () => ({
//     type: DELETE_SONG,
//     payload: deleteSong
// })

/* ------ SELECTORS ------ */

export const getSongs = () => async dispatch => {
    const response = await csrfFetch('/api/songs');

    if (response.ok) {
        const songs = await response.json();
        return dispatch(loadSongs(songs.songs));
    } else {
        console.log('internal server error')
    }
};

const initialState = {
    songs: {}
};


let newState;
/* ------ REDUCER ------ */
const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SONGS:
            newState = { ...state };
            action.songs.forEach((song) => newState.songs[song.id] = song)
            return newState;

        default:
            return {...state};
    }
};

export default songsReducer;
