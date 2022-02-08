import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSongs } from "../../store/songs";
import AudioPlayer from 'react-h5-audio-player';
import "react-h5-audio-player/lib/styles.css";

const Songs = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const allSongs = useSelector((state) => {
    return state.song.songs;
  });
  const songsObj = Object.keys(allSongs);

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  return (
    <div className="songsPage">
        <h2>All Songs</h2>
        {songsObj.map(song => 
            <div key={song.id}>
                <Link to={`/songs/${song.id}`} key={song.id}>{song.name}</Link>
    </div>
    )}
    </div>
  );
};

export default Songs;
