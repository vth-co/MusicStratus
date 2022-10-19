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
            <i class="fa-solid fa-user"></i>
          </div>
        </div>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button className="logout-button" onClick={logout}>
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
              Log Out
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
