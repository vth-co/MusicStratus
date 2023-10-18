import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import "react-jinke-music-player/assets/index.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import { NavLink } from "react-router-dom";
import { useState } from "react";
import BottomAudioPlayer from "../../CustomAudioPlayer/BottomAudioPlayer";
import CardAudioPlayer from "../../CustomAudioPlayer/CardAudioPlayer";

const Tracks = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);
  const library = songs.filter((song) => song.userId === sessionUser.id);
  const [currentTrack, setTrackIndex] = useState("");

  return (
    <>
      <div className="tracks-container">
        {library.map((song) => (
          <div song={song} key={song.id}>
            <div className="image-audio-container">
              <NavLink to={`/songs/${song.id}`}>
                <img className="image" src={song.imageUrl} alt={""} />
              </NavLink>

              <CardAudioPlayer song={song} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tracks;
