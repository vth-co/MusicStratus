import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editComment } from "../../store/comments";
import { deleteComment } from "../../store/comments";

function EditComment({ ele }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  const commentObj = useSelector((state) => state.comments.comments);
  const comment = Object.values(commentObj);

  const [body, setBody] = useState(comment?.body);

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      commentId: ele,
      userId: userId,
      body,
    };
    dispatch(editComment(payload));
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    let payload = {
      commentId: ele,
    };
    const deletedComment = await dispatch(deleteComment(payload));
  };

  return (
    <div className="form-container">
      <div className="user-login-container">
        <form onSubmit={handleSubmit}>
          <h3 className="form-title">Edit Comment</h3>
          <div className="errors-container">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </div>
          <div className="form-inputs-container">
            <div className="field">
              <input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>
            <button className="user-form-button" type="submit">
              Update
            </button>
            <button className="user-form-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditComment;
