import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CardAudioPlayer from "../../CustomAudioPlayer/CardAudioPlayer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-jinke-music-player/assets/index.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import "./All.css";

const All = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const likedSongs = useSelector((state) => state.likes);
  const songs = useSelector((state) => state.songs.songs);
  const playlistsObj = useSelector((state) => state.playlists);
  const playlists = Object.values(playlistsObj);

  // Combine items from different categories into a single array
  const allItems = [];

  // Likes
  const userLikedSongs = Object.values(likedSongs).filter(
    (like) => like.userId === sessionUser.id
  );
  const likedSongsWithDetails = userLikedSongs.map((like) => {
    const { songId } = like;
    return { type: "like", ...songs[songId], createdAt: like.createdAt };
  });
  allItems.push(...likedSongsWithDetails);

  // Extract the most recent playlist information
  const recentPlaylists = playlists.filter((playlist) => playlist.userId === sessionUser.id).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5); // Adjust the number of playlists to display

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
    (song) => song.userId === sessionUser.id
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
        <h3>Recent</h3>
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
                <div className="playlist-item">
                  <NavLink to={`/${sessionUser.username}/playlists/${item.id}`}>
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.name} />
                    )}
                  </NavLink>
                  <div className="playlist-info">
                    <div className="playlist-btn-info-container">
                      <NavLink
                        to={`/${sessionUser.username}/playlists/${item.id}`}
                      >
                        <div className="playlist-play-button">
                          <i className="fa-solid fa-circle-play"></i>
                        </div>
                      </NavLink>
                      <div>
                        <NavLink to={`/user/${sessionUser.username}`}>
                          <p className="playlist-user">
                            {sessionUser.username}
                          </p>
                        </NavLink>
                        <NavLink
                          className="playlist-link"
                          to={`/${sessionUser.username}/playlists/${item.id}`}
                        >
                          <p className="playlist-header">{item.name}</p>
                        </NavLink>
                      </div>
                    </div>
                    {/* Render playlist songs */}
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
