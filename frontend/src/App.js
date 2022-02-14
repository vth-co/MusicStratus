// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormModal from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import UserPage from "./components/UserPage";
import Song from "./components/SongPage";
import SplashPage from "./components/SplashPage"

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
            <SignupFormModal />
          </Route>
          <Route exact path='/'>
            <SplashPage />
          </Route>
          <Route path='/user'>
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
