import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    return history.push("/");
  };

  return (
    <>
      <button className="profile-username-button-container" onClick={openMenu}>
        <div className="profile-container">
          <div >
            <i className="fa-solid fa-user-astronaut"></i>
          </div>
          <div>
            <p className="username">{user.username}</p>
          </div>
            <i class="fa-solid fa-angle-down"></i>
        </div>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>Profile</li>
          <li>{user.email}</li>
          <li>
            <button className="form-button" onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
