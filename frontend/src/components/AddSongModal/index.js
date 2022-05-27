import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddSong from "./AddSong";

function AddSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="add-song-button" onClick={() => setShowModal(true)}>
        <div className="hidden-text">
          <div className="text">Upload song</div>
        </div>
        <i class="fa-solid fa-circle-plus"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddSong setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddSongModal;
