// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import UserPage from "./components/DiscoverPage";
import Song from "./components/SongPage";
import SplashPage from "./components/SplashPage"
import ErrorPage from "./components/ErrorPage";
import SignupForm from "./components/SignupFormModal/SignupForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

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
          <Route exact path='/'>
            <SplashPage />
          </Route>
          <Route exact path='/user'>
            <UserPage />
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
