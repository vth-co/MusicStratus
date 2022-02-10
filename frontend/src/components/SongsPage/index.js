import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs";
import { Redirect } from "react-router-dom";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./songs.css";
import AddSongModal from "../AddSongModal";
import { NavLink } from "react-router-dom";

const AllSongs = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj)


  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="songsPage">
      <h3>Add a New Song?</h3>
      <AddSongModal />
      <h3>All Songs</h3>
      {songs?.map((song) => (
        <div className="eachSong" key={song.id}>
          <NavLink key={song.id} to={`/songs/${song.id}`}>{song.title}</NavLink>
            
          <AudioPlayer
            className="songPlayer"
            src={song?.url}
            
          />
          <img className="songImg" src={song.imageUrl} />
        </div>
      ))}
    </div>
  );
};

export default AllSongs;
