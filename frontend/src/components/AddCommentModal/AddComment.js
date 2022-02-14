import React, { useState } from "react";
import { addComment } from "../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import "./AddComment.css";

function AddComment() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

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
      <form className="add-comment-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Comment:
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <button className="form-button" type="submit">Add Comment</button>
      </form>
    </div>
  );
}

export default AddComment;
