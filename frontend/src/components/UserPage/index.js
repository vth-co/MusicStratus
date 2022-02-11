import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs";
import { Redirect, NavLink } from "react-router-dom";
import "./UserPage.css";
import AddSongModal from "../AddSongModal";

const UserPage = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="userPage">
      <h3>Users Profile</h3>
      <div className="songs-container">
        {songs?.map((song) => (
          <div className="eachSong" key={song.id}>
            <div>
              <NavLink song={song} to={`/songs/${song.id}`}>
                {song.title}
                <img className="songImage" src={song.imageUrl} />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
      <h4>Add a New Song?</h4>
      <AddSongModal />
    </div>
  );
};

export default UserPage;
