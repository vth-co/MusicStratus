import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddSong from "./AddSong";
// import "./SongModal.css";

function AddSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="modal-button" onClick={() => setShowModal(true)}>
        Upload Song
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddSong />
        </Modal>
      )}
    </>
  );
}

export default AddSongModal;
