import React, { useEffect, useState } from "react";
import { addSong } from "../../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import "./AddSong.css";
import {useHistory} from "react-router-dom"

function AddSong({ setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      userId,
      title,
      url,
      imageUrl,
    };

    const data = await dispatch(addSong(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setShowModal(false);
      history.push(`/user`)
    }
  };

  useEffect(() => {
    setErrors([]);

    const errors = [];
    if (title.length > 30 || !title.length) {
      errors.push('Song title must be between 1 and 30 characters');
    }
    if (!url.endsWith(".mp3")) {
      errors.push('URL must be a proper MP3 link')
    }
    setErrors(errors);
  }, [title, url])

  return (
    <div className="song-form-container">
      <form className="add-song-form" onSubmit={handleSubmit}>
        <div className="errors-container">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
        <div className="form-inputs-container">
          <div className="label">
            <label>Title</label>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="label">
            <label>Url</label>
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <div className="label">
            <label>Cover</label>
          </div>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <button className="user-form-button" type="submit">
            Add Song
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSong;
