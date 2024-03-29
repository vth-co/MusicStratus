import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeletePlaylist from "./DeletePlaylist";


function DeletePlaylistModal({ playlist }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="playlist-btn" onClick={() => setShowModal(true)}>
      <i class='bx bxs-trash-alt'></i>
      <span>Delete</span>
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          <DeletePlaylist onClose={closeModal} playlist={playlist}/>
        </Modal>
      )}
    </>
  );
}

export default DeletePlaylistModal;
