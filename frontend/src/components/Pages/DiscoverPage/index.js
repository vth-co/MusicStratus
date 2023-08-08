import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./DiscoverPage.css";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-jinke-music-player/assets/index.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const DiscoverPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);
  const discover = songs.filter((song) => song.userId !== sessionUser.id);
  const library = songs.filter((song) => song.userId === sessionUser.id);
  const [currentTrack, setTrackIndex] = useState("");
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 4, // optional, default to 1.
      // partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  // const LibraryButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  //   const {
  //     carouselState: { currentSlide },
  //   } = rest;
  //   return (
  //     <div className="carousel-button-group">
  //       <button
  //         className={currentSlide === 0 ? "disable" : "carousel-button-left"}
  //         onClick={() => previous()}
  //       >
  //         <i class="fa-solid fa-square-caret-left"></i>
  //       </button>
  //       <button
  //         className="carousel-button-right"
  //         onClick={() => goToSlide(currentSlide + 1)}
  //       >
  //         <i class="fa-solid fa-square-caret-right"></i>
  //       </button>
  //       {/* <button
  //         className="carousel-button-shuffle"
  //         onClick={() =>
  //           goToSlide(Math.floor(Math.random() * library.length + 1))
  //         }
  //       >
  //         <i class="fa-solid fa-shuffle"></i>
  //       </button> */}
  //     </div>
  //   );
  // };

  // const DiscoverButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  //   const {
  //     carouselState: { currentSlide },
  //   } = rest;
  //   return (
  //     <div className="carousel-button-group">
  //       <button
  //         className={currentSlide === 0 ? "disable" : "carousel-button-left"}
  //         onClick={() => previous()}
  //       >
  //         <i class="fa-solid fa-square-caret-left"></i>
  //       </button>
  //       <button
  //         className="carousel-button-right"
  //         onClick={() => goToSlide(currentSlide + 1)}
  //       >
  //         <i class="fa-solid fa-square-caret-right"></i>
  //       </button>
  //       {/* <button
  //         className="carousel-button-shuffle"
  //         onClick={() =>
  //           goToSlide(Math.floor(Math.random() * discover.length + 1))
  //         }
  //       >
  //         <i class="fa-solid fa-shuffle"></i>
  //       </button> */}
  //     </div>
  //   );
  // };

  return (
    <>
      <div className="discover-page">
        <div className="discover-carousel-container">
          <h2 className="section-title">Explore</h2>
          <Carousel
            // partialVisible={true}
            // centerMode={true}
            responsive={responsive}
            // infinite={true}
            containerClass="container"
            // renderButtonGroupOutside={true}
            // customButtonGroup={<DiscoverButtonGroup />}
            // arrows={false}
            centerMode="true"
            infinite
          >
            {discover?.map((song) => (
              <div className="song-card" song={song} key={song.id}>
                <NavLink className="song-link" to={`/songs/${song.id}`}>
                  <div className="card-container">
                    <img className="image" src={song.imageUrl} alt={""} />
                    <NavLink to={"/discover"}>
                      <button
                        className="card-play-button"
                        value={song?.url}
                        onClick={(e) => setTrackIndex(e.target.value)}
                      >
                        <i className="fa-solid fa-circle-play"></i>
                      </button>
                    </NavLink>
                  </div>
                  <p className="song-title">{song.title}</p>
                  <p className="song-artist">{song.artist}</p>
                </NavLink>
              </div>
            ))}
          </Carousel>
        </div>
        <div div className="discover-carousel-container">
          <h2 className="section-title">Library</h2>
          <Carousel
            // partialVisible={true}
            // centerMode={true}
            responsive={responsive}
            // infinite={true}
            containerClass="container"
            // renderButtonGroupOutside={true}
            // customButtonGroup={<LibraryButtonGroup />}
            // arrows={false}
            centerMode="true"
            infinite
          >
            {library?.map((song) => (
              <div className="song-card" song={song} key={song.id}>
                <NavLink className="song-link" to={`/songs/${song.id}`}>
                  <div className="card-container">
                    <img className="image" src={song.imageUrl} alt={""} />
                    <NavLink to={"/discover"}>
                      <button
                        className="card-play-button"
                        value={song?.url}
                        onClick={(e) => setTrackIndex(e.target.value)}
                      >
                        <i className="fa-solid fa-circle-play"></i>
                      </button>
                    </NavLink>
                  </div>
                  <p className="song-title">{song.title}</p>
                  <p className="song-artist">{song.artist}</p>
                </NavLink>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="music-container">
          <AudioPlayer
            className="audio-player"
            volume={0.2}
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
      </div>
    </>
  );
};

export default DiscoverPage;
