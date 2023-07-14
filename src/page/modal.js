import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
`;

const ModalImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: white;
`;

const Modal = ({ imageUrl, onClose }) => {
  return (
    <ModalContainer>
      <ModalContent>
        <ModalImage src={imageUrl} alt="Image" />
        <CloseButton onClick={onClose}>X</CloseButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
