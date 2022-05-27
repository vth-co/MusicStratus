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
    const deletedSong = await dispatch(deleteSong(song.id));
    if (deletedSong) return history.push("/user");
  };

  let songEditButtons;
  if (userId === song.userId) {
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
          <div>{songEditButtons}</div>
          <div className="image-container">
            <h2 className="individual-song-title">{song?.title}</h2>
            <img className="song-image" src={song.imageUrl} alt="" />
            <AudioPlayer
              className="audio-player"
              src={song?.url}
              volume={0.3}
            />
          </div>
          {/* </div> */}
          <div className="comments-container">
            <AddComment />
            <Comments songId={song.id} />
          </div>
        </div>
        <div className="background-container">
          <img className="background-image" src={song.imageUrl} alt="" />
        </div>
      </>
    );
  }
};

export default Song;
