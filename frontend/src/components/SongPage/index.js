import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { deleteSong } from "../../store/songs";
import EditSongModal from "../EditSongModal";
import { getSongs } from "../../store/songs";
import Comments from "../Comments";
import "./SongPage.css";
import AddComment from "../AddComment";

import Player from "react-wavy-audio";
import ReactJkMusicPlayer from "react-jinke-music-player";
import Waveform from "./waveform.js";
import test from './test.mp3';

const Song = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  const song = useSelector((state) => state.songs.songs[id]);

  const [errors, setErrors] = useState([]);

  const audioLists1 = [
    {
      name: song?.title,
      musicSrc: song?.url,
      cover: song?.imageUrl,
    },
  ];

  const options = {
    audioLists: audioLists1,
    defaultPosition: {
      right: 100,
      bottom: 120,
    },
    getAudioInstance(audio) {
      console.log("audio instance", audio);
    },
  };

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const deletedSong = await dispatch(deleteSong(song?.id));
    if (deletedSong) return history.push("/user");
  };

  let songEditButtons;
  if (userId === song?.userId) {
    songEditButtons = (
      <div className="editAndDelete">
        <EditSongModal />
        <button className="button" onClick={handleDelete}>
          <i class="fa-solid fa-trash-can"></i> Delete
        </button>
      </div>
    );
  }

  if (!song) {
    return null;
  } else {
    return (
      <>
        <div className="song-container">
          {/* <div className="audio-player-container"> */}
          <h2 className="individual-song-title">{song?.title}</h2>
          <div className="song-comment-container">
            {/* <div className="comments-container">
              <Comments songId={song?.id} />
              <AddComment />
            </div> */}
            <div className="image-container">
              <AudioPlayer
                className="audio-player"
                src={song?.url}
                volume={0.3}
              />
              {/* <Waveform 
              /> */}

              <img className="song-image" src={song?.imageUrl} alt="" />

              {/* <ReactJkMusicPlayer 
                {...options}
              /> */}
            </div>
            {/* <div>{songEditButtons}</div> */}
          </div>
        </div>
        <div className="background-container">
          {/* <img className="background-image" src={song?.imageUrl} alt="" /> */}
        </div>
      </>
    );
  }
};

export default Song;
