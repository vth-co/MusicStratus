import React from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../store/audioplayer";
import { NavLink } from "react-router-dom";

const BottomAudioPlayer = ({ currentTrack }) => {
  const dispatch = useDispatch();

  const handleTrackChange = (newTrack) => {
    dispatch(setCurrentTrack(newTrack));
  };

  const trackInfo = `${currentTrack.title} - ${currentTrack.artist}`;

  return (
    <div className="music-container">
      <AudioPlayer
        autoPlay
        className="audio-player bottom"
        // header={trackInfo}
        volume={0.2}
        layout="horizontal-reverse"
        src={currentTrack.url}
        onPlay={(e) => handleTrackChange(e.target.src)}
        customAdditionalControls={[
          <div className="bottom-audio-player-button-container">
            <NavLink to={`/songs/${currentTrack.id}`}>
              <button className="bottom-button">
                <img
                  className="image bottom-player"
                  src={currentTrack.imageUrl}
                />
              </button>
            </NavLink>
            <div className="song-title-container">
              <NavLink to={`/songs/${currentTrack.id}`}>
                <button className="bottom-button">
                  <p className="song-title">{currentTrack.artist}</p>
                </button>
                <button className="bottom-button">
                  <p className="song-title">{currentTrack?.title}</p>
                </button>
              </NavLink>
            </div>
          </div>,
        ]}
        // customProgressBarSection={[
        //   RHAP_UI.CURRENT_TIME,
        //   <div>/</div>,
        //   RHAP_UI.DURATION,
        //   RHAP_UI.PROGRESS_BAR,
        //   RHAP_UI.VOLUME,
        // ]}
        // customVolumeControls={[]}
        // style={{
        //   width: "600px",
        // }}
        // customAdditionalControls={[
        //   <button>
        //     <img className="image" src={song?.imageUrl} alt={""}></img>
        //   </button>,
        // ]}
      />
      {/* <CustomAudioPlayer
              currentTrack={currentTrack}
            /> */}
    </div>
  );
};

export default BottomAudioPlayer;
