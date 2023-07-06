import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editSong } from "../../../store/songs"
import { getSingle } from "../../../store/songs";

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
      imageUrl,
    };
    dispatch(editSong(payload));
  };

  return (
    <div>
      <div className="edit-song-container">
          <form onSubmit={handleSubmit}>
            <h3 className="form-title">Edit Song</h3>
            <div className="errors-container">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </div>
            <div className="form-inputs-container">
              <div className="field">
                <div className="label">
                  <label>Title</label>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <div className="label">
                  <label>Url</label>
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <div className="label">
                  <label>Cover</label>
                </div>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e?.target.value)}
                  required
                />
              </div>
              <button className="user-form-button" type="submit">
                Update
              </button>
            </div>
          </form>
      </div>
    </div>
  );
}

export default EditSong;
