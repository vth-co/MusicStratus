import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddSong from "./AddSong";

function AddSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="button" onClick={() => setShowModal(true)}>
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
