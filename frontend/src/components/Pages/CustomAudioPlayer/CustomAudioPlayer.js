import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const CustomAudioPlayer = ({ currentTrack }) => {
  return (
    <div className="custom-audio-player">
      {/* <div className="player-left">
        <img src={image} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>{artist}</p>
        </div>
      </div> */}
      <div className="player-right">
        <AudioPlayer
          volume={0.2}
          src={currentTrack}
          title={currentTrack?.title}
          artist={currentTrack?.artist}
          image={currentTrack?.imageUrl}
        />
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
