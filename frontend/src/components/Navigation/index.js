import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginPage";
import SignupModal from "../SignupFormModal";
import DemoUser from "../DemoUser";
import "./Navigation.css";
import AddSongModal from "../AddSongModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <nav className="navbar-home">
        <div className="buttons">
          <NavLink className="title-link" to="/discover">
            <img className="splash-icon" src="../../../images/icon.png"></img>
          </NavLink>
          <NavLink to={"/discover"}>
            <button className="feed-button">Home</button>
          </NavLink>
          {/* <NavLink to={"/discover"}>
            <button className="feed-button" >Library</button>
          </NavLink> */}
        </div>
        <div className="buttons">
          <AddSongModal />
          <ProfileButton user={sessionUser} />
        </div>
      </nav>
    );
  } else {
    sessionLinks = (
      <nav className="navbar">
        <div className="buttons">
          <NavLink className="splash-title-link" to="/">
            <img className="splash-icon" src="../../../images/icon.png"></img>
            <h2>MusicStratus</h2>
          </NavLink>
        </div>
        <div className="buttons">
          {/* <DemoUser /> */}
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
