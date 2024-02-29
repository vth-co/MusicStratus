// music.js reducer

export const SET_CURRENT_SONG = "music/SET_CURRENT_SONG";

export const setCurrentSong = (currentSong) => ({
  type: SET_CURRENT_SONG,
  payload: currentSong,
});

const initialState = {
  currentSong: null,
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SONG:
      return { ...state, currentSong: action.payload };
    default:
      return state;
  }
};

export default musicReducer;
