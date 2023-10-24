import React from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import EditSongModal from "../Songs/EditSongModal";
import DeleteSongModal from "../Songs/DeleteSongModal";
import { useSelector } from "react-redux";
import LikeButton from "../Likes/LikeButton";
import "./CustomAudio.css";

const TopAudioPlayer = ({ song }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  let songEditButtons;
  if (userId === song?.userId) {
    songEditButtons = (
      <div>
        <EditSongModal />
        <DeleteSongModal />
      </div>
    );
  }

  return (
    <div className="song-comment-container">
      <div className="image-container">
        <AudioPlayer
          className="audio-player"
          src={song?.url}
          volume={0.2}
          header={song.title}
          footer={song.artist}
          customAdditionalControls={[
            <div className="song-edit-container">{songEditButtons}</div>,
          ]}
          customProgressBarSection={[
            <div className="duration"></div>,
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.CURRENT_TIME,
            <div>/</div>,
            RHAP_UI.DURATION,
          ]}
          customControlsSection={[
            <div className="like-btn-container">
              <LikeButton song={song} />
            </div>,
            RHAP_UI.ADDITIONAL_CONTROLS,
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.VOLUME_CONTROLS,
          ]}
        />
        <img className="song-image" src={song?.imageUrl} alt="" />
      </div>
    </div>
  );
};

export default TopAudioPlayer;
