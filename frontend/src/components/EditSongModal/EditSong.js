import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSong } from "../../store/songs";
import { getSingle } from "../../store/songs";

function EditSong() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  const song = useSelector((state) => state.songs.songs[id]);

  const [title, setTitle] = useState(song?.title);
  const [url, setUrl] = useState(song?.url);
  const [imageUrl, setImageUrl] = useState(song?.imageUrl);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      songId: id,
      // userId: userId,
      title,
      url,
      imageUrl
    };
     dispatch(editSong(payload));
  };


  return (
    <div className="edit-song-form-div">
      <form className="edit-song-form" onSubmit={handleSubmit}>
          <h3>Edit Song</h3>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Url
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Cover
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e?.target.value)}
            
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditSong;
