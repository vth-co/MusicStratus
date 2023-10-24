import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CardAudioPlayer from "../../CustomAudioPlayer/CardAudioPlayer";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import "react-jinke-music-player/assets/index.css";
import "react-h5-audio-player/lib/styles.less"; //Use LESS
import LikeButton from "../../Likes/HeartButton";

const Likes = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const likedSongs = useSelector((state) => state.likes);
  const songs = useSelector((state) => state.songs.songs);

  // Filter liked songs by the current user
  const userLikedSongs = Object.values(likedSongs).filter(
    (like) => like.userId === sessionUser.id
  );

  // Map liked song IDs to their full song objects
  const likedSongsWithDetails = userLikedSongs.map((like) => {
    const { songId } = like;
    const { id, title, artist, url, imageUrl } = songs[songId];

    return { id, title, artist, url, imageUrl  };
  });

  likedSongsWithDetails.reverse();


  return (
    <>
      <div className="tracks-container">
        {likedSongsWithDetails.map((song) => (
          <div song={song} key={song.id}>
            <div className="image-audio-container">
              <NavLink to={`/songs/${song.id}`}>
                <img className="image" src={song.imageUrl} alt={""} />
              </NavLink>
              <CardAudioPlayer song={song} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Likes;
