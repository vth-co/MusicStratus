import React from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../../store/music";


const BottomAudioPlayer = () => {

  const dispatch = useDispatch();
  const currentSong = useSelector(((state) => state.music.currentSong));


  const handleSongChange = (newSong) => {
    dispatch(setCurrentSong(newSong));
  };


  return (
    <div className="music-container">
            <AudioPlayer
            className="audio-player"
            volume={0.2}
            layout="horizontal-reverse"
            src={currentSong ? currentSong : ""}
            onPlay={(e) => handleSongChange(e.target.src)}
            // customAdditionalControls={[
            //   <div>
            //     <button>
            //       button 2<p className="song-title">{song?.title}</p>
            //     </button>
            //     <button>button 3 </button>
            //     <button>button 4 </button>
            //   </div>,
            // ]}
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
