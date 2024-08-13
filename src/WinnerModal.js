// WinnerModal.js
import React from 'react';
import Modal from 'react-modal';
import './WinnerModal.css'; // For custom styles

Modal.setAppElement('#root');

function WinnerModal({ winner, isOpen, onClose, playerName }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Winner Modal">
      <h1>{winner ? `${playerName} Wins!` : "It's a Draw!"}</h1>
      <button onClick={onClose} className="play_button">Play Again</button>
    </Modal>
  );
}

export default WinnerModal;
