import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';

import './SingleSong.css';

const SingleSong = () => {
    const song = Object.values(singleSong)
    const { songId } = useParams();
    const singleSong = useSelector(state => state.songs.songs[songId])


    return (
        <div>
            <div className="song-div">
                <div className="song-info">
                    <h3 className="song-title">{song.title}</h3>
                    <img
                        className="no-song-img"
                        src="https://cdn2.iconfinder.com/data/icons/audio-files-essential/48/v-30-512.png"
                    />
                </div>
                <div className="comment-div">
                    <h4 className="comment-label">Comments</h4>
                    <div className="comment-input-button">
                        <input
                            className="comment-input"
                            placeholder="Write a comment"
                            required
                        ></input>
                        <button className="comment-button">Submit</button>
                    </div>
                    <div className="comment-section">
                        <ul></ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleSong;
