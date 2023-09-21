import React, { useEffect, useState } from "react";
import { addSong } from "../../../store/songs";
import { useDispatch, useSelector } from "react-redux";
import "./AddSong.css";
import { useHistory } from "react-router-dom";

function AddSong({ setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    let payload = {
      userId,
      title,
      artist,
      url,
      imageUrl,
    };

    const data = await dispatch(addSong(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setShowModal(false);
      history.push(`/user`);
    }
  };

  const uploadSongs = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    let payload = {};
    if (file) {
      const fileName = file.name;
      payload = {
        userId,
        title: fileName,
        songFile: file,
      }
    }

    const data = await dispatch(addSong(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setShowModal(false);
      history.push(`/user`);
    }
  };

  useEffect(() => {
    setErrors([]);

    const errors = [];
    if (submitted) {
      if (title.length > 30 || !title.length) {
        errors.push("Song title must be between 1 and 30 characters");
      }
      if (!url.endsWith(".mp3")) {
        errors.push("URL must be a proper MP3 link");
      }
    }
    setErrors(errors);
  }, [title, url, submitted]);

  return (
    <div className="song-form-container">
      <div className="vl"></div>
      {/* <form className="song-form" onSubmit={handleSubmit}>
        <h3 className="form-title">Manually Add a Song</h3>
        <div className="errors-container">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
        <div className="form-inputs-container">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Song Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Image Url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <button className="user-form-submit" type="submit">
            Add Song
          </button>
        </div>
      </form> */}
      <form className="song-form" onSubmit={uploadSongs}>
        <h3 className="form-title">Select File</h3>
        <input
          className="user-form-submit"
          type="file"
          accept=".mp3" //! Optional: Limit file types to MP3 if desired
          onChange={uploadSongs}
        />
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
}

export default AddSong;
