// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import { getSongs } from "./store/songs";
import { getComments } from "./store/comments";
import { getLikes } from "./store/likes";
import { getPlaylists } from "./store/playlists";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import ErrorPage from "./components/Pages/ErrorPage";
import SplashPage from "./components/Pages/SplashPage";
import DiscoverPage from "./components/Pages/DiscoverPage";
import Song from "./components/Songs/SongPage";
import Navigation from "./components/Navigation";
import SignupPage from "./components/Pages/AuthPages/SignupPage";
import LoginPage from "./components/Pages/AuthPages/LoginPage";
import FeedPage from "./components/Pages/FeedPage";
import LibraryPage from "./components/Pages/LibraryPage";
import SearchResults from "./components/Search/SearchResults";
import UserProfile from "./components/Pages/User";
import Playlist from "./components/Pages/PlaylistPage";
import { getUsers } from "./store/users";
import BottomAudioPlayer from "./components/CustomAudioPlayer/BottomAudioPlayer";

library.add(fas);

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSongs());
    dispatch(getComments());
    dispatch(getLikes());
    dispatch(getPlaylists());
    dispatch(getUsers());
  });

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
        <Switch>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/404">
            <ErrorPage />
          </Route>
          <Route exact path={"/"}>
            <SplashPage />
          </Route>
          <Route path="/discover">
            <DiscoverPage />
          </Route>
          <Route path="/feed">
            <FeedPage />
          </Route>
          <Route path="/library">
            <LibraryPage />
          </Route>
          <Route path="/songs/:id">
            <Song />
          </Route>
          <Route path="/search">
            <SearchResults />
          </Route>
          <Route path="/user/:username">
            <UserProfile />
          </Route>
          <Route path="/:username/playlists/:id">
            <Playlist />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
        {sessionUser && <BottomAudioPlayer />}
        </>
      )}
    </>
  );
}

export default App;
