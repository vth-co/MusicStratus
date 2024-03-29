import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditComment from "./EditComment";

function EditCommentModal({ comment }) {
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
        <i className="fa-solid fa-pen"></i>
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          <EditComment comment={comment} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
