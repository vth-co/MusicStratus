import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "react-h5-audio-player/lib/styles.css";
import Comments from "../../Comments";
import "./SongPage.css";
import AddComment from "../../Comments/AddComment";
import SideTiles from "../../SideTiles";
import TopAudioPlayer from "../../CustomAudioPlayer/TopAudioPlayer";
import LikeButton from "../../Likes/LikeButton";
import EditSongModal from "../EditSongModal";
import DeleteSongModal from "../DeleteSongModal";
import "./SongPage.css";

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
        
        <img className="song-image" src={song?.imageUrl} alt="" />
        <div className="player-info">
          <div className="inside">
          <p className="song-header">{song.title}</p>
          <LikeButton song={song} />
          </div>
          <p className="song-footer">{song.artist}</p>
        </div>
        <div className="player-buttons-container">
          <NavLink to={`/songs/${parseInt(song.id) - 1}`}>
            <button className="player-btn prev">
              <i class="bx bx-skip-previous"></i>
            </button>
          </NavLink>
          <button
            className="player-btn play"
            onClick={() => setCurrentTrack(song)}
          >
            <i className="fa-solid fa-circle-play"></i>
          </button>
          <NavLink to={`/songs/${parseInt(song.id) + 1}`}>
            <button className="player-btn next">
              <i class="bx bx-skip-next"></i>
            </button>
          </NavLink>
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
