import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editSong } from "../../../store/songs";

function EditSong({ onClose, song }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  // const song = useSelector((state) => state.songs.songs[id]);

  const [title, setTitle] = useState(song?.title);
  const [url, setUrl] = useState(song?.url);
  const [imageUrl, setImageUrl] = useState(song?.imageUrl);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      songId: id,
      // userId: userId,
      title,
      url,
      imageUrl,
      imageFile,
    };
    dispatch(editSong(payload));
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(""); // Clear image URL if a file is selected
    }
  };

  return (
    <div className="edit-song-container">
      <form onSubmit={handleSubmit}>
        <h3 className="form-title">Edit Song</h3>
        <div className="errors-container">
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </div>
        <div className="form-inputs-container">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Url</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

          <label>Cover</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e?.target.value)}
            required
          />
          <input type="file" onChange={handleFileChange} />
          <button className="user-form-submit" type="submit">
            Update
          </button>
          <button className="exit" onClick={handleCancel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="svg-container"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSong;
