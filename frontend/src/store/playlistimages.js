export const setPlaylistImages = (images) => ({
    type: 'SET_PLAYLIST_IMAGES',
    payload: images,
  });


const playlistsReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_PLAYLIST_IMAGES":
      return {
        ...state,
        playlistImages: action.payload,
      };
    // ... other cases
    default:
      return state;
  }
};

export default playlistsReducer;
