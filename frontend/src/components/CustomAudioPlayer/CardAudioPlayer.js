import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import LikeButton from "../Likes/LikeButton";
import "./CustomAudio.css"
import { useSelector } from "react-redux";
import EditSongModal from "../Songs/EditSongModal";
import DeleteSongModal from "../Songs/DeleteSongModal";

const CardAudioPlayer = ({ song }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  let songEditButtons;
  if (userId === song?.userId) {
    songEditButtons = (
      <div>
        <EditSongModal song={song}/>
        <DeleteSongModal song={song}/>
      </div>
    );
  } else {
    songEditButtons = (
      <div></div>
    )
  }

  return (
    <>
      <AudioPlayer
        className="card-audio-player"
        src={song?.url}
        volume={0.1}
        header={song.title}
        footer={song.artist}
        layout={"stacked-reverse"}
        showJumpControls={false}
        customProgressBarSection={[
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.CURRENT_TIME,
          RHAP_UI.DURATION,
        ]}
        customAdditionalControls={
            [
<div className="song-edit-container">{songEditButtons}</div>,

            ]
          }
          customControlsSection={
            [
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.ADDITIONAL_CONTROLS,
              <LikeButton song={song} />,

            ]
          }
      />
    </>
  );
};

export default CardAudioPlayer;
