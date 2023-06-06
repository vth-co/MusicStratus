import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginPage";
import SignupModal from "../SignupFormModal";
import "./Navigation.css";
import AddSongModal from "../AddSongModal";
import SearchBar from "../Search";

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
            <button className="feed-button">Feed</button>
            <button className="feed-button">Library</button>
          </NavLink>
          {/* <NavLink to={"/discover"}>
            <button className="feed-button" >Library</button>
          </NavLink> */}
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
