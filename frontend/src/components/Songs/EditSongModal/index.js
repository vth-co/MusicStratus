import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditSong from "./EditSong";
import "./EditSong.css";

function EditSongModal({ song }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button className="sng-btn" onClick={() => setShowModal(true)}>
      <i className="fa-solid fa-pen"></i> Edit
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
