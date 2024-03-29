import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import SearchBar from "../Search/SearchBar";
import AddSongModal from "../Songs/AddSongModal";
import SignupFormModal from "../Auth/Signup";
import LoginFormModal from "../Auth/Login";


const Navigation = ({ isLoaded }) => {
  const user = useSelector((state) => state.session.user);

  let location = useLocation();

  let sessionLinks;
  if (location.pathname === "/") {
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
          <SignupFormModal />
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
          <NavLink to={"/discover"} activeClassName="active">
            <button className="feed-button" >Home</button>
          </NavLink>
          <NavLink to={"/feed"} activeClassName="active">
            <button className="feed-button" >Feed</button>
          </NavLink>
          <NavLink to={"/library"} activeClassName="active">
            <button className="feed-button" >Library</button>
          </NavLink>
          <SearchBar />
          <AddSongModal />
          <ProfileButton user={user} />
        </div>
      </nav>
    );
  }

  return (
    <>
      <div>{isLoaded && sessionLinks}</div>
    </>
  );
};

export default Navigation;
