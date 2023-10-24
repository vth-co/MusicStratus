import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import LikeButton from "../Likes/LikeButton";
import "./CustomAudio.css"

const CardAudioPlayer = ({ song }) => {

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

            ]
          }
          customControlsSection={
            [
              RHAP_UI.MAIN_CONTROLS,
              <LikeButton song={song} />,
            ]
          }
      />
    </>
  );
};

export default CardAudioPlayer;
