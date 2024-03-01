import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./DiscoverPage.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BottomAudioPlayer from "../../CustomAudioPlayer/BottomAudioPlayer";
import HeartButton from "../../Likes/HeartButton";

const DiscoverPage = ({ setCurrentTrack }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);
  const discover = songs.filter((song) => song.userId !== sessionUser.id);
  const library = songs.filter((song) => song.userId === sessionUser.id);
  const playlistsObj = useSelector((state) => state.playlists);
  const playlists = Object.values(playlistsObj);
  const [firstSongImages, setFirstSongImages] = useState({});
  const userPlaylists = playlists.filter(
    (playlist) => playlist.userId === sessionUser.id
  );

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

  useEffect(() => {
    const fetchFirstSongImages = async () => {
      const imagePromises = playlists.map(async (playlist) => {
        const response = await fetch(`/api/playlists/${playlist.id}/songs`);
        if (response.ok) {
          const songsData = await response.json();
          if (songsData.length > 0) {
            const firstSong = songsData[0];
            return { playlistId: playlist.id, imageUrl: firstSong.imageUrl };
          }
        }
        return { playlistId: playlist.id, imageUrl: null };
      });

      const images = await Promise.all(imagePromises);
      const imageMap = {};
      images.forEach((image) => {
        imageMap[image.playlistId] = image.imageUrl;
      });
      setFirstSongImages(imageMap);
    };

    if (playlists.length > 0) {
      fetchFirstSongImages();
    }
  }, []);

  return (
    <>
      <div className="discover-page">
        <div className="discover-carousel-container">
          <h2 className="section-title">Explore</h2>
          <Carousel
            responsive={responsive}
            containerClass="container"
            centerMode="true"
            infinite
          >
            {discover?.map((song) => (
              <div className="song-card" song={song} key={song.id}>
                <NavLink className="song-link" to={`/songs/${song.id}`}>
                  <div className="card-container">
                    <img className="image" src={song.imageUrl} alt={""} />
                    <div class="overlay"></div>
                    <NavLink to={"/discover"}>
                      <button
                        className="card-play-button"
                        onClick={() => setCurrentTrack(song)}
                      >
                        <i className="fa-solid fa-circle-play"></i>
                      </button>
                      <div className="heart-button-container">
                        <HeartButton song={song} />
                      </div>
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
            responsive={responsive}
            containerClass="container"
            centerMode="true"
            infinite
          >
            {library?.map((song) => (
              <div className="song-card" song={song} key={song.id}>
                <div className="card-container">
                  <NavLink className="song-link" to={`/songs/${song.id}`}>
                    <img className="image" src={song.imageUrl} alt={""} />
                    <div className="overlay"></div>
                  </NavLink>
                  <NavLink to={"/discover"}>
                    <button
                      className="card-play-button"
                      onClick={() => setCurrentTrack(song)}
                    >
                      <i className="fa-solid fa-circle-play"></i>
                    </button>
                  </NavLink>
                  <div className="heart-button-container">
                    <HeartButton song={song} />
                  </div>
                </div>
                <NavLink className="song-link" to={`/songs/${song.id}`}>
                  <p className="song-title">{song.title}</p>
                  <p className="song-artist">{song.artist}</p>
                </NavLink>
              </div>
            ))}
          </Carousel>
        </div>
        <div div className="discover-carousel-container">
          <h2 className="section-title">Playlists</h2>
          <Carousel
            responsive={responsive}
            containerClass="container"
            centerMode="true"
            infinite
          >
            {userPlaylists.map((playlist) => (
              <div className="song-card" playlist={playlist} key={playlist.id}>
                <div className="card-container">
                  <NavLink
                    className="song-link"
                    to={`/${sessionUser.username}/playlists/${playlist.id}`}
                  >
                    {firstSongImages[playlist.id] && (
                      <img
                        src={firstSongImages[playlist.id]}
                        alt="First Song"
                        className="image"
                      />
                    )}
                    <div className="overlay"></div>
                  </NavLink>
                </div>
                <NavLink
                  className="song-link"
                  to={`/${sessionUser.username}/playlists/${playlist.id}`}
                >
                  <p className="song-title playlist">{playlist.name}</p>
                </NavLink>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default DiscoverPage;
