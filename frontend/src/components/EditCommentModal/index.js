import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditComment from "./EditComment"
import './EditComment.css';

function EditCommentModal({ele}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
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
