import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

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
      <div className="profile-button">
        <button className="feed-button" onClick={openMenu}>
          <img
            className="user-icon"
            src="../../../images/default-icon.png"
          ></img>
          <i className="fa-solid fa-chevron-down"></i>
          {showMenu && (
            <div className="profile-dropdown">
              {/* <button className="logout-button"><i class='bx bxs-user' ></i>Profile</button> */}
              {/* <p className="email"> {user.username}</p>
              <p className="email">{user.email}</p> */}
                <button className="logout-button" onClick={logout}>
                <i class='bx bx-log-out' ></i>
                  Log Out
                </button>
            </div>
          )}
        </button>
      </div>
    </>
  );
}

export default ProfileButton;
