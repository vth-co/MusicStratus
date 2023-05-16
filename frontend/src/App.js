// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import DiscoverPage from "./components/DiscoverPage";
import Song from "./components/SongPage";
import SplashPage from "./components/SplashPage"
import ErrorPage from "./components/ErrorPage";
import SignupForm from "./components/SignupFormModal/SignupForm";
import { getSongs } from "./store/songs";
import { getComments } from "./store/comments";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSongs());
    dispatch(getComments());
  })

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/404">
            <ErrorPage />
          </Route>
          <Route exact path={'/'}>
            <SplashPage />
          </Route>
          <Route path='/discover'>
            <DiscoverPage />
          </Route>
          <Route path='/songs/:id'>
            <Song />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
