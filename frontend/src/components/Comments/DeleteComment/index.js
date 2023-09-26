import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteComment from "./DeleteComment";

function DeleteCommentModal({ comment }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        className="edit-comment-button"
        onClick={() => setShowModal(true)}
      >
        <i className="fa-solid fa-trash"></i>
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          <DeleteComment comment={comment} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;
