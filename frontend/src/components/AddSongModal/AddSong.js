import React, { useState } from "react";
import { addSong } from "../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import "./AddSong.css";

function AddSong() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

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

    dispatch(addSong(payload));
  };

  return (
    <div className="add-song-form-div">
      <form className="add-song-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Add Song</h3>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Title: 
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Url: 
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Cover: 
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>
        <button className="form-button" type="submit">Add Song</button>
      </form>
    </div>
  );
}

export default AddSong;
