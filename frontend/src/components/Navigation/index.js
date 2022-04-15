import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupModal from "../SignupFormModal";
import DemoUser from "../DemoUser";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupModal />
        <DemoUser />
      </>
    );
  }

  return (
    <div>
      <nav className="navBar">
        <div>
          <NavLink className="home" to="/user">
            <img
              className="icon"
              src="../../../images/libraryIcon.png"
              alt=""
            ></img>
          </NavLink>
        </div>
        <div className="appTitle">
          <NavLink className="title" to="/">
            <div>
              <h1>MusicStratus</h1>
            </div>
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
