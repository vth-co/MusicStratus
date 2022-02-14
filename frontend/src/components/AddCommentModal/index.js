import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddComment from "./AddComment";


function AddCommentModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="button" onClick={() => setShowModal(true)}>
        Add your Comment
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddComment />
        </Modal>
      )}
    </>
  );
}

export default AddCommentModal;
