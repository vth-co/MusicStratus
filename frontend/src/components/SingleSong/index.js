import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import './SingleSong.css';

const SingleSong = () => {
    const dispatch = useDispatch();
    const song = Object.values(singleSong);
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;
    const { songId } = useParams();
    const singleSong = useSelector(state => state.songs.songs[songId])
    const [errors, setErrors] = useState([])

    const [title, setTitle] = useState(singleSong.title)
    // const [url,]


    
}

export default SingleSong;
