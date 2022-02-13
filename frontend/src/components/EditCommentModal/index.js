import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditComment from "./EditComment"

function EditCommentModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="modal-button" onClick={() => setShowModal(true)}>
        Edit Comment
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComment />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
