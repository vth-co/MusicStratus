import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditComment from "./EditComment"

function EditCommentModal({ele}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="modal-button" onClick={() => setShowModal(true)}>
        Edit Comment
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditComment ele={ele}/>
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
