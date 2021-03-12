import React from 'react';
import ReactDom from 'react-dom';

const Modal = ({
    isOpen,
    onClose,
    fixed,
    hasButton,
    overlayClass,
    modalClass,
    children,
}) => {
    if (!isOpen) return null;

    return ReactDom.createPortal(
        <>
            <div
                className={overlayClass}
                style={OVERLAY_STYLES}
                onClick={!fixed ? onClose : null}
            />
            <div className={modalClass} style={MODAL_STYLES}>
                {hasButton ? (
                    <button onClick={onClose}>Close Modal</button>
                ) : null}
                {children}
            </div>
        </>,
        document.getElementById('portal'),
    );
};

Modal.defaultProps = {
    hasButton: true,
};

//FOR DEVELOPMENTAL PURPOSES
const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '10px',
    zIndex: 999,
};

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 999,
};

export default Modal;
