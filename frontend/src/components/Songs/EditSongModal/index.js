import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditSong from "./EditSong";
import "./EditSong.css";

function EditSongModal({ song }) {
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
      <i className="fa-solid fa-pen"></i>
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          <EditSong onClose={closeModal} song={song}/>
        </Modal>
      )}
    </>
  );
}

export default EditSongModal;
