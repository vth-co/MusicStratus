import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "react-jinke-music-player/assets/index.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import { NavLink } from "react-router-dom";
import { useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";


const LibraryPage = () => {
  const sessionUser = useSelector((state) => state.session.user);

    const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);
  const library = songs.filter((song) => song.userId === sessionUser.id);


  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const shuffledSongs = shuffleArray(songs);
  shuffledSongs.length = 12;

  const [currentTrack, setTrackIndex] = useState("");

  return (
    <>
      <div className="grid-container">
        {/* <div className="grid"> */}
        {library.map((song) => (
          <div className="song-card" song={song}>
          <NavLink className="song-link" to={`/songs/${song.id}`}>
            <div className="card-container">
              <img className="image" src={song.imageUrl} alt={""} />
              <NavLink to={"/library"}>

                <button
                  className="card-play-button"
                  value={song?.url}
                  onClick={(e) => setTrackIndex(e.target.value)}
                >
                  <i class="fa-solid fa-circle-play"></i>
                </button>
                </NavLink>

            </div>
            <p className="song-title">{song.title}</p>
            <p className="song-artist">{song.artist}</p>
          </NavLink>
        </div>
        ))}
        {/* </div> */}
      </div>
      <div className="music-container">
          <AudioPlayer
            className="audio-player"
            volume={0.3}
            layout="horizontal-reverse"
            src={currentTrack}
            // customAdditionalControls={[
            //   <div>
            //     <button>
            //       {/* button 2<p className="song-title">{song?.title}</p> */}
            //     </button>
            //     <button>button 3 </button>
            //     <button>button 4 </button>
            //   </div>,
            // ]}
            customProgressBarSection={[
              RHAP_UI.CURRENT_TIME,
              <div>/</div>,
              RHAP_UI.DURATION,
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.VOLUME,
            ]}
            customVolumeControls={[]}
            // style={{
            //   width: "600px",
            // }}
            // customAdditionalControls={[
            //   // <button>
            //   //   {/* <img className="image" src={song?.imageUrl} alt={""}></img> */}
            //   // </button>,
            // ]}
          />
        </div>
    </>
  );
};

export default LibraryPage;
