import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import AddPlaylist from "./AddPlaylist";


function AddPlaylistModal({ song }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="sng-btn" onClick={() => setShowModal(true)}>
      <i class='bx bx-list-plus'></i>
      <span>Add to Playlist</span>
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          <AddPlaylist onClose={closeModal} song={song}/>
        </Modal>
      )}
    </>
  );
}

export default AddPlaylistModal;
