// music.js reducer

export const SET_CURRENT_TRACK = "audioplayer/SET_CURRENT_TRACK";

export const setCurrentTrack = (track) => ({
  type: SET_CURRENT_TRACK,
  payload: track,
});

const initialState = {
  currentTrack: null,
};

const audioPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_TRACK:
      return { ...state, currentTrack: action.payload };
    default:
      return state;
  }
};

export default audioPlayerReducer;
