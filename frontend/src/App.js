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
import TopAudioPlayer from "./components/CustomAudioPlayer/TopAudioPlayer";

library.add(fas);

function App() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [currentTrack, setCurrentTrack] = useState("");
  const [currentTimeTop, setCurrentTimeTop] = useState(0);
  const [currentTimeBottom, setCurrentTimeBottom] = useState(0);
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

  const setCurrentTime = (currentTime) => {
    // Update current time of both top and bottom audio players
    // Implement this function according to your requirements
    setCurrentTimeTop(currentTime);
    setCurrentTimeBottom(currentTime);
  };

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
              <DiscoverPage setCurrentTrack={setCurrentTrack} />
            </Route>
            <Route path="/feed">
              <FeedPage setCurrentTrack={setCurrentTrack} />
            </Route>
            <Route path="/library">
              <LibraryPage setCurrentTrack={setCurrentTrack} />
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
          {sessionUser && currentTrack && (
            <BottomAudioPlayer currentTrack={currentTrack} setCurrentTime={setCurrentTime} />
          )}
        </>
      )}
    </>
  );
}

export default App;
