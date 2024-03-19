import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-jinke-music-player/assets/index.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import { NavLink } from "react-router-dom";
import HeartButton from "../../Likes/HeartButton";
import "../Pages.css"


const LibraryPage = ({ setCurrentTrack }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);
  const library = songs.filter((song) => song.userId === sessionUser.id);

  return (
    <>
      <div className="page-container">
        <p className="page-title">Hear your own uploads:</p>
        <div className="grid-container">
          {library.map((song) => (
            <div className="song-card" song={song} key={song.id}>
              <NavLink className="song-link" to={`/songs/${song.id}`}>
                <div className="card-container">
                  <img className="image" src={song.imageUrl} alt={""} />
                  <div class="overlay"></div>
                  <NavLink to={"/library"}>
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
                <p className="song-title">{song.title}</p>
                <p className="song-artist">{song.artist}</p>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LibraryPage;
