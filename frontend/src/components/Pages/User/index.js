import { useState } from "react";
import "./UserProfile.css";
import { useSelector } from "react-redux";
import { NavLink, Switch, useParams } from "react-router-dom";
import ProtectedRoute from "../../../context/ProtectedRoute";
import Tracks from "./Tracks";
import SideTiles from "../../SideTiles";
import Likes from "./Likes";
import Playlists from "./Playlists";
import All from "./All";

const UserProfile = () => {
  const { username } = useParams(); 
  const user = useSelector((state) => state.session.user);

  const usersObj = useSelector((state) => state.users)
  const users = Object.values(usersObj)
  const profile = users.filter((user) => user.username === username);

  // const [headerImage, setHeaderImage] = useState();
  // const [profileImage, setProfileImage] = useState();
  console.log(username)

  return (
    <>
      <div className="profile-container">
        <div className="profile-head">
          {/* <img src="" alt="" /> */}
          <div className="profile-icon"></div>
          <h2 className="profile-username">{user.username}</h2>
          {/* <img className="profile-header" src="../../../images/header.jpg" alt=""/> */}
          <img
              style={{ width: "250px" }}
              src={user.image}
              alt="profile"
            />
        </div>
        <div className="profile-body">
          <ul className="user-info-bar">
            <li>
              <NavLink to={`/user/${user.username}`} activeClassName={false}>
                All
              </NavLink>
            </li>
            <li>
              <NavLink to={`/user/${user.username}/tracks`}>Tracks</NavLink>
            </li>
            <li>
              <NavLink to={`/user/${user.username}/likes`}>Likes</NavLink>
            </li>
            <li>
              <NavLink to={`/user/${user.username}/playlists`}>Playlists</NavLink>
            </li>
          </ul>
          <div className="split-container">
            <div className="left">
              <Switch>
                <ProtectedRoute path={`/user/${user.username}`} exact>
                  <All />
                </ProtectedRoute>
                <ProtectedRoute path={`/user/${user.username}/tracks`}>
                  <Tracks />
                </ProtectedRoute>
                <ProtectedRoute path={`/user/${user.username}/likes`}>
                  <Likes />
                </ProtectedRoute>
                <ProtectedRoute path={`/user/${user.username}/playlists`} exact>
                  <Playlists />
                </ProtectedRoute>
              </Switch>
            </div>
            <div className="right">
              <SideTiles />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
