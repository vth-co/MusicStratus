import { useState } from "react";
import "./UserProfile.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-bootstrap";
import { Switch } from "react-router-dom";
import ProtectedRoute from "../AuthPages/ProtectedRoute";

const UserProfile = () => {
  const user = useSelector((state) => state.session.user);

  const [headerImage, setHeaderImage] = useState();
  const [profileImage, setProfileImage] = useState();

  return (
    <>
      <div className="profile-container">
        <div className="profile-head">
          {/* <img src="" alt="" /> */}
          <div className="profile-icon"></div>
          <h2 className="profile-username">{user.username}</h2>
          {/* <img className="profile-header" src="../../../images/header.jpg" alt=""/> */}
        </div>
        <div className="profile-body">
          <div className="left">
            <div>
              {/* <ul className="user-info-bar">
                <li>
                  <NavLink to={"/:username"}>
                  All
                  </NavLink>
                   </li>
                <Switch>
               
                <ProtectedRoute path="/:username/uploads" exact={true}>
                  <Uploads />
                </ProtectedRoute>
                <ProtectedRoute path="/:username/playlists" exact={true}>
                  <Playlists />
                </ProtectedRoute>
                <ProtectedRoute path="/:username/likes" exact={true}>
                  <Likes />
                </ProtectedRoute>
                </Switch>
              </ul> */}
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
