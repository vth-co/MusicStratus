import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./UserProfile.css";
import { useEffect, useState } from "react";
import CardAudioPlayer from "../../CustomAudioPlayer/CardAudioPlayer";
import DeletePlaylistModal from "../../Playlists/DeleteModal";

const Playlists = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const playlistsObj = useSelector((state) => state.playlists); // Retrieve playlists from your state

  const playlists = Object.values(playlistsObj);

  const [firstSongImages, setFirstSongImages] = useState({});
  const [playlistSongs, setPlaylistSongs] = useState({});

  // Filter playlists by the current user
  const userPlaylists = playlists.filter(
    (playlist) => playlist.userId === user.id
  );

  useEffect(() => {
    // Fetch the image for the first song in each playlist
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

    // Only run this effect once, when the component mounts
    if (playlists.length > 0) {
      fetchFirstSongImages();
    }
  }, []);

  useEffect(() => {
    // Fetch songs for the playlist
    const fetchSongsForPlaylist = async (playlistId) => {
      // Check if songs for this playlist have already been fetched
      if (!playlistSongs[playlistId]) {
        try {
          const response = await fetch(`/api/playlists/${playlistId}/songs`);
          if (response.ok) {
            const songsData = await response.json();
            setPlaylistSongs((prevSongs) => ({
              ...prevSongs,
              [playlistId]: songsData,
            }));
          } else {
            console.error("Failed to fetch songs for the playlist.");
          }
        } catch (error) {
          console.error("An error occurred while fetching songs:", error);
        }
      }
    };

    // Call the function to fetch songs for each playlist
    userPlaylists.forEach((playlist) => {
      fetchSongsForPlaylist(playlist.id);
    });
  }, [userPlaylists, playlistSongs]);

  return (
    <>
      <div>
        {userPlaylists.map((playlist) => (
          <div key={playlist.id} className="image-audio-container">
            <NavLink
              className="playlist-link"
              to={`/${user.username}/playlists/${playlist.id}`}
            >
              <div>
                {firstSongImages[playlist.id] && (
                  <img
                    src={firstSongImages[playlist.id]}
                    alt="First Song"
                    className="image"
                  />
                )}
              </div>
              <div className="playlist-info">
                <div className="playlist-btn-info-container">
                  <div className="playlist-play-button">
                    <i class="fa-solid fa-circle-play"></i>
                  </div>
                  <div>
                    <NavLink to={`/user/${user.username}`}>
                      <p className="playlist-user">{user.username}</p>
                    </NavLink>
                    <p className="playlist-header">{playlist.name}</p>
                  </div>
                </div>
                <div className="song-li-container">
                  {playlistSongs[playlist.id] &&
                    playlistSongs[playlist.id].map((song, index) => (
                      <NavLink to={`/songs/${song.id}`} className="song-link">
                        <div key={song.id} className="song-li">
                          <img src={song.imageUrl} className="tiny-image" />
                          <ul className="song-info">
                            <li>{index + 1}</li>
                            <li className="playlist-song-title">
                              {song.artist}
                            </li>
                            <li>-</li>
                            <li>{song.title}</li>
                          </ul>
                        </div>
                      </NavLink>
                    ))}
                </div>
              </div>
            </NavLink>
                {/* <div>
                  <button></button>
                  <DeletePlaylistModal />
                  <button></button>
                  <button></button>
                </div> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Playlists;
