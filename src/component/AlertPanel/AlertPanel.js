import React from 'react';
import Modal from '../Modal';

const AlertPanel = ({ title, message, isOpen, onSubmit, onClose }) => {
    return (
        <Modal fixed isOpen={isOpen} hasButton={false}>
            <div>
                <h2>{title || 'Are you sure?'}</h2>
                <p>{message}</p>
                <button onClick={onSubmit}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </Modal>
    );
};

export default AlertPanel;
