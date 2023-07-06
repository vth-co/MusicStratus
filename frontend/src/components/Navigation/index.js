import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import SignupModal from "../Auth/Signup";
import "./Navigation.css";
import SearchBar from "../Search";
import AddSongModal from "../Songs/AddSongModal"
import LoginFormModal from "../Auth/Login"

const Navigation = ({ isLoaded }) => {
  const user = useSelector((state) => state.session.user);

  let location = useLocation();

  let sessionLinks;
  if (location.pathname === '/') {
    sessionLinks = (
      <nav className="navbar">
        <div className="buttons">
          <NavLink className="splash-title-link" to="/">
            <img className="splash-icon" src="../../../images/icon.png"></img>
            <h2>MusicStratus</h2>
          </NavLink>
        </div>
        <div className="buttons">
          <LoginFormModal />
          <SignupModal />
        </div>
      </nav>
    );
  } else if (user) {
    sessionLinks = (
      <nav className="navbar-home">
        <div className="buttons">
          <NavLink className="title-link" to="/discover">
            <img className="splash-icon" src="../../../images/icon.png"></img>
          </NavLink>
          <NavLink to={"/discover"}>
            <button className="feed-button">Home</button>
          </NavLink>
          <NavLink to={"/feed"}>
            <button className="feed-button">Feed</button>
          </NavLink>
          <NavLink to={"/library"}>
            <button className="feed-button">Library</button>
          </NavLink>
          <SearchBar />
          <AddSongModal />
          <ProfileButton user={user} />
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
