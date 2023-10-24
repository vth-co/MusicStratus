import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import "react-jinke-music-player/assets/index.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import { NavLink } from "react-router-dom";
import { useState } from "react";
import BottomAudioPlayer from "../../CustomAudioPlayer/BottomAudioPlayer";
import HeartButton from "../../Likes/HeartButton";

const FeedPage = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);
  const discover = songs.filter((song) => song.userId !== sessionUser.id);

  const [currentTrack, setTrackIndex] = useState("");

  return (
    <>
      <div className="page-container">
        <p className="page-title">Hear the latest posts from the people:</p>
        <div className="grid-container">
          {discover.map((song) => (
            <div className="song-card" song={song} key={song.id}>
              <NavLink className="song-link" to={`/songs/${song.id}`}>
                <div className="card-container">
                  <img className="image" src={song.imageUrl} alt={""} />
                  <div class="overlay"></div>
                  <NavLink to={"/feed"}>
                    <button
                      className="card-play-button"
                      value={song?.url}
                      onClick={(e) => setTrackIndex(e.target.value)}
                    >
                      <i className="fa-solid fa-circle-play"></i>
                    </button>
                  </NavLink>
                  <HeartButton song={song} />
                </div>
                <p className="song-title">{song.title}</p>
                <p className="song-artist">{song.artist}</p>
              </NavLink>
            </div>
          ))}
        </div>
        <BottomAudioPlayer currentTrack={currentTrack} />
      </div>
    </>
  );
};

export default FeedPage;
