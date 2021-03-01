import React from 'react';
import ReactDom from 'react-dom';

const Modal = ({ isOpen, onClose, fixed, children }) => {
    if (!isOpen) return null;

    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} onClick={!fixed && onClose} />
            <div style={MODAL_STYLES}>
                <button onClick={onClose}>Close Modal</button>
                {children}
            </div>
        </>,
        document.getElementById('portal'),
    );
};

//FOR DEVELOPMENTAL PURPOSES
const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '10px',
    zIndex: 1000,
};

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000,
};

export default Modal;
