import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupModal from "../SignupFormModal";
import "./Navigation.css";
import DemoUser from "../DemoUser";

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
    // <ul>
    //   <li>
    //     <NavLink exact to="/user">Home</NavLink>
    //     {isLoaded && sessionLinks}
    //   </li>
    // </ul>

    <nav className="navBar">
      <NavLink className="home" to="/user">
        <img
          className="icon"
          src="../../../images/libraryIcon.png"
          alt=""
        ></img>
      </NavLink>
      <div className="appTitle">
        <NavLink className="titleAndIcon" to="/">
          <div className="title">
            <h2>MusicStratus</h2>
          </div>
        </NavLink>
      </div>
      <div className="buttons">
        <div className="userButtons">{isLoaded && sessionLinks}</div>
      </div>
    </nav>
  );
}

export default Navigation;
