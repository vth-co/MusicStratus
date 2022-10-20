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
      <nav className="navBar-home">
        <div className="buttons">
          <NavLink className="title-link" to="/discover">
            <img className="splash-icon" src="../../../images/icon.png"></img>
            <h2>MusicStratus</h2>
          </NavLink>
        </div>
        <div className="landing">
          <NavLink className='button' to={"/discover"}>Home</NavLink>
          <NavLink className='button' to={"/discover"}>Library</NavLink>
          <ProfileButton user={sessionUser} />
        </div>
      </nav>
    );
  } else {
    sessionLinks = (
      <nav className="navBar">
        <div className="buttons">
          <NavLink className="title-link" to="/">
            <img className="splash-icon" src="../../../images/icon.png"></img>
            <h2>MusicStratus</h2>
          </NavLink>
        </div>
        <div className="landing">
          <DemoUser />
          <LoginFormModal />
          <SignupModal />
        </div>
      </nav>
    );
  }

  return (
    <div>
      <div>{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
