import { useState } from "react";
import UploadUserImage from "./UploadUserImage";
import { Modal } from "../../../context/Modal";


const UploadUserImageModal = () => {
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
      }

    return (
        <>
          <button className="" onClick={() => setShowModal(true)}>
        {/* <div className="hidden-text">
          <div className="text">Upload song</div>
        </div>
        <i class="fa-solid fa-circle-plus"></i> */}
        Upload image
      </button>
      {showModal && (
       <Modal onClose={closeModal}>
          <UploadUserImage onClose={closeModal}/>
        </Modal>
      )}
        </>
    )
}

export default UploadUserImageModal;
