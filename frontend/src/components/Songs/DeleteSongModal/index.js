import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteSong from "./DeleteSong";


function DeleteSongModal({ song }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Stop event propagation to prevent closing the menu
    setShowModal(true);
  };

  return (
    <>
      <button className="sng-btn" onClick={handleClick}>
      <i className="fa-solid fa-trash-can"></i>
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          <DeleteSong onClose={closeModal} song={song}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteSongModal;
