import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./UserProfile.css";
import { useEffect, useState } from "react";
import CardAudioPlayer from "../../CustomAudioPlayer/CardAudioPlayer";

const Playlists = () => {
  const user = useSelector((state) => state.session.user);
  const playlistsObj = useSelector((state) => state.playlists); // Retrieve playlists from your state

  const playlists = Object.values(playlistsObj);

  const [firstSongImages, setFirstSongImages] = useState({});

  //   Filter playlists by the current user
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

    fetchFirstSongImages();
  }, [playlists]);

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
              <div className="playlist-play-button">
                <i class="fa-solid fa-circle-play"></i>
              </div>
              <p className="playlist-header">{playlist.name}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
};

export default Playlists;
