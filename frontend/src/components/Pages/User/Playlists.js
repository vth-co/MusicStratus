import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./UserProfile.css";
import { useEffect, useState } from "react";
import DeletePlaylistModal from "../../Playlists/DeleteModal";
import EditPlaylistModal from "../../Playlists/EditModal";

const Playlists = () => {
  const user = useSelector((state) => state.session.user);
  const playlistsObj = useSelector((state) => state.playlists);

  const playlists = Object.values(playlistsObj);
  const [firstSongImages, setFirstSongImages] = useState({});
  const [playlistSongs, setPlaylistSongs] = useState({});

  const userPlaylists = playlists.filter(
    (playlist) => playlist.userId === user.id
  );

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

  useEffect(() => {
    const fetchSongsForPlaylist = async (playlistId) => {
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

    userPlaylists.forEach((playlist) => {
      fetchSongsForPlaylist(playlist.id);
    });
  }, [userPlaylists, playlistSongs]);

  return (
    <>
      <div>
        {userPlaylists.map((playlist) => (
          <div key={playlist.id} className="image-audio-container">
            <div>
              <NavLink
                className="playlist-link"
                to={`/${user.username}/playlists/${playlist.id}`}
              >
                {firstSongImages[playlist.id] && (
                  <img
                    src={firstSongImages[playlist.id]}
                    alt="First Song"
                    className="image"
                  />
                )}
              </NavLink>
            </div>
            <div className="playlist-info">
              <div className="playlist-btn-info-container">
                <NavLink
                  to={`/${user.username}/playlists/${playlist.id}`}
                >
                  <div className="playlist-play-button">
                    <i class="fa-solid fa-circle-play"></i>
                  </div>
                </NavLink>
                <div>
                  <NavLink to={`/user/${user.username}`}>
                    <p className="playlist-user">{user.username}</p>
                  </NavLink>
                  <NavLink
                    className="playlist-link"
                    to={`/${user.username}/playlists/${playlist.id}`}
                  >
                    <p className="playlist-header">{playlist.name}</p>
                  </NavLink>
                </div>
              </div>
              <div className="song-li-container">
                {playlistSongs[playlist.id] &&
                  playlistSongs[playlist.id].map((song, index, array) => (
                    <NavLink to={`/songs/${song.id}`} className="song-link">
                      <div key={song.id} className="song-li">
                        <img src={song.imageUrl} className="tiny-image" />
                        <ul className="song-info">
                          <li>{index + 1}</li>
                          <li className="playlist-song-title">{song.artist}</li>
                          <li>-</li>
                          <li>{song.title}</li>
                        </ul>
                      </div>
                    </NavLink>
                  ))}
              </div>
              <div className="modal-buttons-container">
                <EditPlaylistModal playlist={playlist} />
                <DeletePlaylistModal playlist={playlist} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Playlists;
