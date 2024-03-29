import { useSelector } from "react-redux";
// import { useState } from "react";
import "./SplashPage.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import "react-jinke-music-player/assets/index.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import { NavLink } from "react-router-dom";
import SearchBar from "../../Search/SearchBar";

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
            interval={4500}
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
              <img src="../../../images/carousel3.jpg" />
            </div>
          </Carousel>
        </div>
      </div>
      <div className="searchbar">
        <SearchBar />
        <p>or</p>
        <NavLink to={"/signup"}>
          <button className="btn-upload">
            Upload your own
          </button>
        </NavLink>
      </div>
      <h2 className="grid-header">
        Hear what’s trending for free in the MusicStratus community
      </h2>
      <div className="grid-container-splash">
        {/* <div className="grid"> */}
        {shuffledSongs.map((song) => (
          <ul song={song} className="grid-card" key={song.id}>
            <NavLink to={"/signup"}>
              <img className="card-image" src={song.imageUrl} alt={""} />
              <button className="grid-card-play-button">
                <i className="fa-solid fa-circle-play"></i>
              </button>
              <li className="card-title">{song.title}</li>
              <li className="card-artist">{song.artist}</li>
            </NavLink>
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
      <div className="footer">
        <div className="footer-links-container">
          <ul className="footer-ul">
            <p className="footer-section">About Me:</p>
            <a
              href="/pdfs/Software Engineer Vu Co.pdf"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            <a
              href="https://vth-co.github.io/"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
            <a
              href="https://www.linkedin.com/in/vu-co/"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Linkedin
            </a>
            <a
              href="https://github.com/vth-co/MusicStratus"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
            <p className="footer-section">Resources</p>
            <a className="link">JavaScript</a>
            <a className="link">HTML/CSS</a>
            <a className="link">React/Redux</a>
            <a className="link">PostgreSQL</a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
