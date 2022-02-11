import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { NavLink } from "react-router-dom";
import { deleteSong } from "../../store/songs";
import EditSongModal from "../EditSongModal";
import { getSongs } from '../../store/songs';

import './SongPage.css';

const Song = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id;

    const { songId } = useParams();

    const songsObj = useSelector((state) => state.songs.songs)
    const song = Object.values(songsObj);
    console.log(song)
    
    const [errors, setErrors] = useState([])

    const [title, setTitle] = useState(song?.title)
    const [url, setUrl] = useState(song?.url);
    const [imageUrl, setImageUrl] = useState(song?.imageUrl)

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch])


    // if (!song)
    return (
        <>
        <h2>Song Selected:{song?.title}</h2>
        <div className='song-container'>
            <div className='songImage'></div>
            <div className='songPlayer'>
            <AudioPlayer className="songPlayer" src={song?.url} />

            </div>
            <div>

            </div>
        </div>
        </>
    )
    //     <h3>All Songs</h3>
    //   {songs?.map({id, title} => (
    //     <div className="eachSong" key={song.id}>
    //       <div className="songLink">
    //         <NavLink key={song.id} to={`/songs/${song.id}`}>
    //           {song.title}
    //         </NavLink>
    //       </div>


    //       <div>
    //         <img className="songImg" src={song.imageUrl} />
    //       </div>


    //       <div className="editAndDeleteButtons">
    //       <EditSongModal song={song}/>

    //       <button className="songDelete"
    //       onClick={() => dispatch(deleteSong(song.id))}
    //       >Delete Song</button>
    //       </div>
    //     </div>
    //   ))}
    
    
}

export default Song;
