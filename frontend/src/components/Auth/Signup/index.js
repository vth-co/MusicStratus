import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <button className='signup-btn' onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={closeModal}>
          <SignupForm onClose={closeModal}/>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
