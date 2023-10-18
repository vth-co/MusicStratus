import React, { useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import { useSelector } from "react-redux";

const CardAudioPlayer = ({ song }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  const [currentTrack, setTrackIndex] = useState("");


  return (
    <>
      {/* <button
        className="card-play-button"
        value={song?.url}
        onClick={(e) => setTrackIndex(e.target.value)}
      >
        <i className="fa-solid fa-circle-play"></i>
      </button> */}
      <AudioPlayer
        className="card-audio-player"
        src={song?.url}
        volume={0.2}
        header={song.title}
        footer={song.artist}
        customProgressBarSection={[
          <div className="duration"></div>,
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.CURRENT_TIME,
          <div>/</div>,
          RHAP_UI.DURATION,
        ]}
      />
    </>
  );
};

export default CardAudioPlayer;
