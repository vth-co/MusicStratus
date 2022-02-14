import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { deleteSong } from "../../store/songs";
import EditSongModal from "../EditSongModal";
import { getSongs } from "../../store/songs";
import Comments from "../Comments";
import AddCommentModal from "../AddCommentModal";
import "./SongPage.css";

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
          Delete Song
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
          <div className="song-edit-buttons">{songEditButtons}</div>
          <div>
            <h2 className="song-title">{song?.title}</h2>
          </div>
          <div className="image-container">
            <img className="song-image" src={song.imageUrl} alt="" />
          </div>
          <div className="songPlayer">
            <AudioPlayer src={song?.url} />
          </div>
          <div className="comments-container">
            <Comments songId={song.id} />
            <AddCommentModal />
          </div>
        </div>
      </>
    );
  }
};

export default Song;
