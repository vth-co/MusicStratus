import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import LoginForm from './LoginForm';
import './LoginForm.css';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <button className='btn' onClick={() => setShowModal(true)}>Log in</button>
      {showModal && (
        <Modal onClose={closeModal}>
          <LoginForm onClose={closeModal}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
