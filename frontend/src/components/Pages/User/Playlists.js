import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./UserProfile.css"

const Playlists = () => {
  const user = useSelector((state) => state.session.user);
  const playlistsObj = useSelector((state) => state.playlists); // Retrieve playlists from your state

  const playlists = Object.values(playlistsObj);

  //   Filter playlists by the current user
  const userPlaylists = playlists.filter(
    (playlist) => playlist.userId === user.id
  );

  return (
    <>
      <div>
        {userPlaylists.map((playlist) => (
          <ul key={playlist.id}>
            <li >
              <NavLink className="playlist-link" to={`/${user.username}/playlists/${playlist.id}`}>{playlist.name}</NavLink>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default Playlists;
