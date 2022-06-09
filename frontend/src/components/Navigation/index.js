import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginPage";
import SignupModal from "../SignupFormModal";
import DemoUser from "../DemoUser";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="home-page-buttons-container">
        {/* <div>
          <NavLink className="library-button" to="/user">
            <img
              className="icon"
              src="../../../images/libraryIcon.png"
              alt=""
            ></img>
          </NavLink>
        </div> */}
        <div>
        <ProfileButton user={sessionUser} />
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="landing">
        <DemoUser />
        <LoginFormModal />
        <SignupModal />
      </div>
    );
  }

  return (
    <div>
      <nav className="navBar">
        <div className="title-icon-container">
          <NavLink className="title-link" to="/">
            <img className="splash-icon" src="../../../images/icon.png"></img>
            <h2>MusicStratus</h2>
          </NavLink>
        </div>
        <div className="buttons">
          <div className="userButtons">{isLoaded && sessionLinks}</div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
