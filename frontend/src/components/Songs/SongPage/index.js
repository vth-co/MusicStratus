import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { deleteSong } from "../../../store/songs";
import { getSongs } from "../../../store/songs";
import Comments from "../../Comments";
import "./SongPage.css";
import AddComment from "../../Comments/AddComment";
import EditSongModal from "../EditSongModal";
import DeleteSongModal from "../DeleteSongModal";
import SideTiles from "../../SideTiles";

const Song = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  const song = useSelector((state) => state.songs.songs[id]);

  const [errors, setErrors] = useState([]);

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
      <div>
        <EditSongModal />
        <DeleteSongModal />
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
          <div className="song-comment-container">
            <div className="image-container">
              <AudioPlayer
                className="audio-player"
                src={song?.url}
                volume={0.3}
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
              />
              <img className="song-image" src={song?.imageUrl} alt="" />
            </div>
          </div>
          <div className="comments-container">
            <div>
              <AddComment />
              <Comments songId={song?.id} />
            </div>
            {/* <SideTiles /> */}
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
