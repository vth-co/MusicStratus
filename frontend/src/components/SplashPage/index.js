import { useSelector } from "react-redux";
import { useState } from "react";
import "./SplashPage.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import AudioPlayer from "react-h5-audio-player";
import "react-jinke-music-player/assets/index.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import SearchBar from "../Search";

const SplashPage = () => {
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);

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
    <div className="discover">
      <div className="carousel-container">
        <div className="centering">
          <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            stopOnHover={true}
            infiniteLoop={true}
          >
            <div className="carousel-div">
              <h2 className="carousel-title">Discover new music</h2>
              <p className="carousel-text">
                Listen on the go, ad-free, with a lot of tracks and growing.
              </p>
              <img src="../../../images/carousel2.jpg" />
            </div>
            <div className="carousel-div">
              <h2 className="carousel-title">Share your creativity</h2>
              <p className="carousel-text">
                Upload your first track and begin your journey.
              </p>
              <div></div>
              <img src="../../../images/carousel3.jpg" />
            </div>
          </Carousel>
        </div>
      </div>
      <SearchBar />
      <h2 className="grid-header">
        Hear what’s trending for free in the MusicStratus community
      </h2>
      <div className="grid-container">
        {/* <div className="grid"> */}
          {shuffledSongs.map((song) => (
            <ul song={song} className="grid-card">
              <img className="card-image" src={song.imageUrl} alt={""} />
              <li className="card-title">{song.title}</li>
              <li className="card-artist">{song.artist}</li>
            </ul>
          ))}
        {/* </div> */}
      </div>
      {/* <div className="music-container">
          <AudioPlayer
            className="discover-audio-player"
            volume={0.3}
            layout="horizontal"
            src={currentTrack}
            customAdditionalControls={[
               <button>
                 <img className="image" src={song?.imageUrl} alt={""}></img>
              </button>,
            ]}
          />
        </div> */}
      {/* <div className="footer">
        <div className="footer-links-container">
          <a
            href="https://vth-co.github.io/"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Portfolio</p>
          </a>
          <a
            href="https://github.com/vth-co/MusicStratus"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Github</p>
          </a>
          <a
            href="https://www.linkedin.com/in/vu-co/"
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Linkedin</p>
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default SplashPage;
