import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import { deleteSong } from "../../../store/songs";
import { getSongs } from "../../../store/songs";
import Comments from "../../Comments";
import "./SongPage.css";
import AddComment from "../../Comments/AddComment";
import SideTiles from "../../SideTiles";
import TopAudioPlayer from "../../CustomAudioPlayer/TopAudioPlayer";

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


  if (!song) {
    return null;
  } else {
    return (
      <>
        <div className="song-container">
          <TopAudioPlayer song={song} />
          <div className="comments-container">
            <div>
              <AddComment />
              <Comments songId={song?.id} />
            </div>
            <SideTiles />
          </div>
        </div>
        <div className="background-container">
        </div>
      </>
    );
  }
};

export default Song;
