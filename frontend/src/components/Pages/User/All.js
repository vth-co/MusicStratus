import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CardAudioPlayer from "../../CustomAudioPlayer/CardAudioPlayer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-jinke-music-player/assets/index.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import "./All.css";
import { useEffect, useState } from "react";
import EditPlaylistModal from "../../Playlists/EditModal";
import DeletePlaylistModal from "../../Playlists/DeleteModal";

const All = () => {
  const user = useSelector((state) => state.session.user);

  const likedSongs = useSelector((state) => state.likes);
  const songs = useSelector((state) => state.songs.songs);
  const playlistsObj = useSelector((state) => state.playlists);
  const playlists = Object.values(playlistsObj);
  const [firstSongImages, setFirstSongImages] = useState({});
  const [playlistSongs, setPlaylistSongs] = useState({});

  // Combine items from different categories into a single array
  const allItems = [];

  // Likes
  const userLikedSongs = Object.values(likedSongs).filter(
    (like) => like.userId === user.id
  );
  const likedSongsWithDetails = userLikedSongs.map((like) => {
    const { songId } = like;
    return { type: "like", ...songs[songId], createdAt: like.createdAt };
  });
  allItems.push(...likedSongsWithDetails);

  // Extract the most recent playlist information
  const recentPlaylists = playlists
    .filter((playlist) => playlist.userId === user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5); // Adjust the number of playlists to display

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

    recentPlaylists.forEach((playlist) => {
      fetchSongsForPlaylist(playlist.id);
    });
  }, [recentPlaylists, playlistSongs]);

  // Add playlist information to the allItems array
  recentPlaylists.forEach((playlist) => {
    allItems.push({
      type: "playlist",
      id: playlist.id,
      name: playlist.name,
      imageUrl: playlist.imageUrl, // Assuming you have an imageUrl property in your playlist object
      createdAt: playlist.createdAt,
      // Add any other properties you want to include
    });
  });

  // Tracks
  const userTracks = Object.values(songs).filter(
    (song) => song.userId === user.id
  );
  const tracksWithDetails = userTracks.map((track) => {
    return { type: "track", ...track, createdAt: track.createdAt };
  });
  allItems.push(...tracksWithDetails);

  // Sort all items by the most recent date
  allItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <div className="all-container">
        <h3 className="all-title">Recent</h3>
        <div>
          {allItems.map((item) => (
            <div key={item.id} className="tracks-container">
              {item.type === "like" && (
                <div className="image-audio-container">
                  <NavLink to={`/songs/${item.id}`}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="image"
                    />
                  </NavLink>
                  <CardAudioPlayer song={item} />
                </div>
              )}
              {item.type === "playlist" && (
                <div className="image-audio-container">
                  <NavLink to={`/${user.username}/playlists/${item.id}`}>
                    {firstSongImages[item.id] && (
                      <img
                        src={firstSongImages[item.id]}
                        alt={item.name}
                        className="image"
                      />
                    )}
                  </NavLink>
                  <div className="playlist-info">
                    <div className="playlist-btn-info-container">
                      <NavLink to={`/${user.username}/playlists/${item.id}`}>
                        <div className="playlist-play-button">
                          <i className="fa-solid fa-circle-play"></i>
                        </div>
                      </NavLink>
                      <div>
                        <NavLink to={`/user/${user.username}`}>
                          <p className="playlist-user">{user.username}</p>
                        </NavLink>
                        <NavLink
                          className="playlist-link"
                          to={`/${user.username}/playlists/${item.id}`}
                        >
                          <p className="playlist-header">{item.name}</p>
                        </NavLink>
                      </div>
                    </div>
                    {/* Scrollable container for playlist songs */}
                    <div className="song-li-container">
                      {playlistSongs[item.id] &&
                        playlistSongs[item.id].map((song, index, array) => (
                          <NavLink
                            to={`/songs/${song.id}`}
                            className="song-link"
                          >
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
                    <div className="modal-buttons-container">
                      <EditPlaylistModal playlist={item} />
                      <DeletePlaylistModal playlist={item} />
                    </div>
                  </div>
                </div>
              )}
              {item.type === "track" && (
                <div className="image-audio-container">
                  <NavLink to={`/songs/${item.id}`}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="image"
                    />
                  </NavLink>
                  <CardAudioPlayer song={item} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default All;
