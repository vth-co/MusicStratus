import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditPlaylist from "./EditPlaylist";


function EditPlaylistModal({ playlist }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="playlist-btn" onClick={() => setShowModal(true)}>
      <i class="fa-solid fa-pencil"></i>
      <span>Edit</span>
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          <EditPlaylist onClose={closeModal} playlist={playlist}/>
        </Modal>
      )}
    </>
  );
}

export default EditPlaylistModal;
