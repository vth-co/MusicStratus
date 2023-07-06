import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditComment from "./EditComment"
import './EditComment.css';

function EditCommentModal( {comment} ) {
  const [showModal, setShowModal] = useState(false);
  

  return (
    <>
      <button className="edit-comment-button" onClick={() => setShowModal(true)}>
      <i class="fa-solid fa-ellipsis"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComment comment={comment} />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
