import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const defaultImage = "https://musicstratus.s3.us-west-1.amazonaws.com/360_F_603307418_jya3zntHWjXWn3WHn7FOpjFevXwnVP52.jpg";


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
          <div className="icon-container">
            <img className="profile-icon-nav" src={user.image ? user.image : defaultImage} alt="profile" />
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          {showMenu && (
            <div className="profile-dropdown">
              <NavLink className="profile-btn" to={`/user/${user.username}`}>
                <i class="bx bxs-user"></i>
                Profile
              </NavLink>
              <NavLink
                className="profile-btn"
                to={`/user/${user.username}/tracks`}
              >
                <i class="bx bxs-music"></i>
                Tracks
              </NavLink>
              <NavLink
                className="profile-btn"
                to={`/user/${user.username}/likes`}
              >
                <i class="bx bxs-heart"></i>
                Likes
              </NavLink>
              <NavLink
                className="profile-btn"
                to={`/user/${user.username}/playlists`}
              >
                <i class="bx bxs-playlist"></i>
                Playlists
              </NavLink>

              {/* <p className="email"> {user.username}</p>
              <p className="email">{user.email}</p> */}
              <button className="logout-button" onClick={logout}>
                <i class="bx bx-log-out"></i>
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
