import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

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
      {/* <div>
        {userPlaylists.map((playlist) => (
            <NavLink to={`/set/${playlist.id}`}>
              {playlist.name}
            </NavLink>
        ))}
      </div> */}
    </>
  );
};

export default Playlists;
