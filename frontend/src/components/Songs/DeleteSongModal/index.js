import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteSong from "./DeleteSong";


function DeleteSongModal() {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="sng-btn" onClick={() => setShowModal(true)}>
      <i className="fa-solid fa-trash-can"></i> Delete
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          <DeleteSong onClose={closeModal}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteSongModal;
