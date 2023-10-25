import { useSelector } from "react-redux";


const PlaylistPage = () => {
    const user = useSelector((state) => state.session.user);
    const playlistsObj = useSelector((state) => state.playlists); // Retrieve playlists from your state
  
    const playlists = Object.values(playlistsObj);
  
    //   Filter playlists by the current user
    const userPlaylists = playlists.filter(
      (playlist) => playlist.userId === user.id
    );

    console.log(userPlaylists)

    return (
        <>
        <p>HI</p>
        </>
    )
}

export default PlaylistPage;
