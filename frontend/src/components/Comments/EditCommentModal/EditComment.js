import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editComment } from "../../../store/comments";

function EditComment({ comment, onClose }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const userId = sessionUser.id;

  const [body, setBody] = useState(comment.body);

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      commentId: comment.id,
      userId: userId,
      body,
    };
    const data = await dispatch(editComment(payload));
    if (data) {
      onClose();
    }
  };
  const handleCancel = () => {
    // Call the onClose prop to close the modal
    onClose();
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
            <div className="">
              <button className="button" type="submit">
                Update
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditComment;
