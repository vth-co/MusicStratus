import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "react-h5-audio-player/lib/styles.css";
import Comments from "../../Comments";
import "./SongPage.css";
import AddComment from "../../Comments/AddComment";
import SideTiles from "../../SideTiles";
import TopAudioPlayer from "../../CustomAudioPlayer/TopAudioPlayer";
import LikeButton from "../../Likes/LikeButton";
import EditSongModal from "../EditSongModal";
import DeleteSongModal from "../DeleteSongModal";
import "./SongPage.css"

const Song = ({ setCurrentTrack }) => {
  const { id } = useParams();
  const song = useSelector((state) => state.songs.songs[id]);
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  let songEditButtons;
  if (userId === song?.userId) {
    songEditButtons = (
      <div>
        <EditSongModal song={song} />
        <DeleteSongModal song={song} />
      </div>
    );
  } else {
    songEditButtons = <div></div>;
  }

  return (
    <>
      <div className="song-container">
        <div className="player-container">
          <div>
            <p className="song-header">{song.title}</p>
            <p className="song-footer">{song.artist}</p>
          </div>
            <button
              className="card-play-button"
              onClick={() => setCurrentTrack(song)}
              >
              <i className="fa-solid fa-circle-play"></i>
            </button>
          <img className="song-image" src={song?.imageUrl} alt="" />
        </div>
        <div className="player-buttons">
          <LikeButton song={song} />
          <div className="song-edit-container">{songEditButtons}</div>
        </div>
        <div className="comments-container">
          <div className="">
            <AddComment />
            <Comments songId={song?.id} />
          </div>
          <SideTiles />
        </div>
      </div>
      <div className="background-container"></div>
    </>
  );
};

export default Song;
