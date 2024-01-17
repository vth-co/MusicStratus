import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../store/comments";

function DeleteComment({ comment, onClose }) {
  const dispatch = useDispatch();


  const handleConfirmDelete = async () => {
    try {
      // Dispatch the deleteComment action and wait for its completion
      const deletedComment = await dispatch(
        deleteComment({ commentId: comment.id })
      );

      // Check if the comment was deleted successfully
      if (deletedComment) {
        // Handle success (e.g., show a success message)
        console.log("Comment deleted successfully");
      } else {
        // Handle deletion failure (e.g., show an error message)
        console.error("Failed to delete the comment");
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("An error occurred:", error);
    } finally {
      // Close the confirmation pop-up
      onClose();
    }
  };

  return (
    <>
      <div className="dlt-confirmation">
        <p>Are you sure you want to delete this comment?</p>
        <div className="dlt-btn-container">
          <button className="cncl-btn" onClick={onClose}>Cancel</button>
          <button className="dlt-btn" onClick={handleConfirmDelete}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteComment;
