import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
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
      <div className="buttons">
        <button className="feed-user-button" onClick={openMenu}>
          <div className="profile-container">
            <div>
              <img className="user-icon" src="../../../images/default-icon.png"></img>
            </div>
            <span className="username">{user.username}</span>
          </div>
          {showMenu && (
            <ul className="profile-dropdown">
              <li className="email">{user.email}</li>
              <li>
                <button className="logout-button" onClick={logout}>
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                  Log Out
                </button>
              </li>
            </ul>
          )}
        </button>
      </div>
    </>
  );
}

export default ProfileButton;
