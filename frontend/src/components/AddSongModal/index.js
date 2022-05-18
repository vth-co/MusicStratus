import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddSong from "./AddSong";

function AddSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    
      <button className="add-song-button" onClick={() => setShowModal(true)}>
      <i class="fa-solid fa-circle-plus"></i> Upload Song
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
