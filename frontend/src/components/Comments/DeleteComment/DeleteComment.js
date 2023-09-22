import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../store/comments";

function DeleteComment({ comment, isClicked }) {
  const dispatch = useDispatch();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    // Show the confirmation pop-up when the delete button is clicked
    setShowConfirmation(true);
  };

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
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <div className="dlt-confirmation">
        <p>Are you sure you want to delete this item?</p>
        <button className="delete-btn" onClick={handleConfirmDelete}>
          Yes
        </button>
        <button onClick={() => setShowConfirmation(false)}>No</button>
      </div>
    </>
  );
}

export default DeleteComment;
