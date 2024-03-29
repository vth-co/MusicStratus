import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import songsReducer from "./songs";
import commentsReducer from './comments';
import likesReducer from "./likes";
import playlistsReducer from "./playlists";
import usersReducer from "./users"
import audioPlayerReducer from "./audioplayer";

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  songs: songsReducer,
  comments: commentsReducer,
  likes: likesReducer,
  playlists: playlistsReducer,
  users: usersReducer,
  audioplayer: audioPlayerReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
