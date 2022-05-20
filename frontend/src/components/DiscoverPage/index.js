import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/songs";
import { Redirect, NavLink } from "react-router-dom";
import AddSongModal from "../AddSongModal";
import "./DiscoverPage.css";

const DiscoverPage = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const songsObj = useSelector((state) => state.songs.songs);
  const songs = Object.values(songsObj);

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="discover-page">
      {/* <h3>{sessionUser.username}'s Library</h3> */}
      <h3 className="discover-title">Discover</h3>
      <div className="discover-songs-container">
        {songs?.map((song) => (
          <div key={song.id}>
            <NavLink className="song-link" song={song} to={`/songs/${song.id}`}>
              <h3>{song.title}</h3>
              <div>
                <img className="image" src={song.imageUrl} alt={""} />
              </div>
            </NavLink>
          </div>
        ))}
      </div>
      <div className="add-song-button">
        <AddSongModal />
      </div>
    </div>
  );
};

export default DiscoverPage;
