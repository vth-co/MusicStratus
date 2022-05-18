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
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
          <input
            type="text"
            placeholder="Write a comment"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        <button className="comment-form-button" type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddComment;
