import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "react-h5-audio-player/lib/styles.css";
import Comments from "../../Comments";
import "./SongPage.css";
import AddComment from "../../Comments/AddComment";
import SideTiles from "../../SideTiles";
import TopAudioPlayer from "../../CustomAudioPlayer/TopAudioPlayer";
import LikeButton from "../../Likes/LikeButton";
import AddPlaylistModal from "../../Playlists/AddPlaylistModal";

const Song = () => {
  const { id } = useParams();
  const song = useSelector((state) => state.songs.songs[id]);
  

  if (!song) {
    return null;
  } else {
    return (
      <>
        <div className="song-container">
          <TopAudioPlayer song={song} />
          <div className="comments-container">
            <div>
              <div className="song-buttons-container">
                <div>
                  <LikeButton song={song} />
                  <AddPlaylistModal song={song} />
                </div>
                <div></div>
              </div>
              <AddComment />
              <Comments songId={song?.id} />
            </div>
            <SideTiles />
          </div>
        </div>
        <div className="background-container"></div>
      </>
    );
  }
};

export default Song;
