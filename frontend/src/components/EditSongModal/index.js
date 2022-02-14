import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditSong from "./EditSong";
import "./EditSong.css";

function EditSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="button" onClick={() => setShowModal(true)}>
        Edit Song
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSong />
        </Modal>
      )}
    </>
  );
}

export default EditSongModal;
