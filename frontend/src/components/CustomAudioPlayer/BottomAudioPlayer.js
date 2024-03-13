import React, { useEffect, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack } from "../../store/audioplayer";
import { NavLink } from "react-router-dom";
import { updateTime } from "../../utils/utils";

const BottomAudioPlayer = ({ currentTrack, setCurrentTime }) => {
  const dispatch = useDispatch();
  // const currentTrack = useSelector(((state) => state.audioPlayer.currentTrack));
  const handleTrackChange = (newTrack) => {
    dispatch(setCurrentTrack(newTrack));
  };

    // State to keep track of current time and duration
    const [currentTime, setCurrent] = useState(0);
    const [duration, setDuration] = useState(0);
  
    // Update current time and duration when track changes
    useEffect(() => {
      setCurrent(0);
      setDuration(0);
    }, [currentTrack]);
  
    // Update current time when the audio player progresses
    const handleListen = (e) => {
      setCurrent(e.target.currentTime);
      updateTime(e.target.currentTime, duration, setCurrentTime);
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
            <button className="bottom-button">
              <NavLink to={`/songs/${currentTrack.id}`}>
                <img
                  className="image bottom-player"
                  src={currentTrack.imageUrl}
                />
              </NavLink>
            </button>
            <div className="song-title-container">
              <button className="bottom-button">
                <NavLink to={`/songs/${currentTrack.id}`}>
                  <p className="song-title">{currentTrack.artist}</p>
                </NavLink>
              </button>
              <button className="bottom-button">
                <NavLink to={`/songs/${currentTrack.id}`}>
                  <p className="song-title">{currentTrack?.title}</p>
                </NavLink>
              </button>
            </div>
          </div>,
        ]}
        onListen={handleListen}
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
