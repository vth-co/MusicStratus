import React, { useState } from "react";
import { addComment } from "../../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AddComment() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const userId = user.id;
  const defaultImage = "https://musicstratus.s3.us-west-1.amazonaws.com/360_F_603307418_jya3zntHWjXWn3WHn7FOpjFevXwnVP52.jpg";


  const { id } = useParams();

  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      userId: userId,
      songId: id,
      body,
    };

    setBody("");
    dispatch(addComment(payload));
  };

  return (
    <div className="add-comment-form-div">
      <div className="user-icon-container">
        {/* <img className="user-icon" src="../../../images/default-icon.png"></img> */}
        <img
          className="profile-icon-comment"
          src={user.image ? user.image : defaultImage}
          alt="profile"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type="text"
          className="comment-input"
          placeholder="Add a comment..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        {/* <button className="comment-form-button" type="submit">Add</button> */}
      </form>
    </div>
  );
}

export default AddComment;
