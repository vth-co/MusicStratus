import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteComment, editComment } from "../../../store/comments";

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

    // Trim the input value
    const trimmedBody = body.trim();

    // Check if the trimmed input is empty
    if (trimmedBody === "") {
      // Handle deletion of the comment here
      const deletedComment = await dispatch(
        deleteComment({ commentId: comment.id })
      );

      if (deletedComment) {
        // Comment deleted successfully, close the modal
        onClose();
      } else {
        // Handle deletion failure
        console.error("Failed to delete the comment");
      }
    } else {
      // Update the comment body when it's not empty
      let payload = {
        commentId: comment.id,
        userId: userId,
        body: trimmedBody,
      };

      const data = await dispatch(editComment(payload));
      if (data) {
        onClose();
      }
    }
  };

  const handleCancel = () => {
    // Call the onClose prop to close the modal
    onClose();
  };

  return (
    <div className="form-container">
      <div className="user-login-container">
        {/* {isEditing ? (

        ) : (

        )} */}
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
              />
            </div>
            <button className="user-form-submit" type="submit">
              Update
            </button>
            {/* <button className="cancel-btn" onClick={handleCancel}>Cancel</button> */}
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
    </div>
  );
}

export default EditComment;
