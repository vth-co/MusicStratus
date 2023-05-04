import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs";
import { Redirect, NavLink } from "react-router-dom";
import "./DiscoverPage.css";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const DiscoverPage = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);
 

  const discover = songs.filter((song) => song.userId !== sessionUser.id);
  console.log(discover)

  const library = songs.filter((song) => song.userId === sessionUser.id).reverse();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
      partialVisibilityGutter: 40,
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

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="discover-page">
      {/* <h3>{sessionUser.username}'s Library</h3> */}
      <div className="discover-carousel-container">
        {/* <div className="discover-song-container" key={song.id}>
              <NavLink
                className="song-link"
                song={song}
                to={`/songs/${song.id}`}
              >
                <img className="image" src={song.imageUrl} alt={""} />
                <p className="song-title">{song.title}</p>
              </NavLink>
            </div> */}
        <h2 className="section-title">Explore</h2>
        <Carousel
          partialVisible={true}
          // centerMode={true} 
          responsive={responsive}
          // infinite={true}
          containerClass="container"
        >
          {discover?.map((song) => (
            <div className="song-card">
              <NavLink
                className="song-link"
                song={song}
                to={`/songs/${song.id}`}
              >
                <img className="image" src={song.imageUrl} alt={""} />
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
        partialVisible={true}
        // centerMode={true} 
        responsive={responsive}
        // infinite={true}
        containerClass="container">
          {library?.map((song) => (
            <div>
              <NavLink
               className="song-link"
               song={song}
               to={`/songs/${song.id}`}>
                <img className="image" src={song.imageUrl} alt={""}></img>
                <p className="song-title">{song.title}</p>
                <p className="song-artist">{song.artist}</p>
              </NavLink>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default DiscoverPage;
