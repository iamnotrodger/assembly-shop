import React from 'react';
import ReactDom from 'react-dom';

import './Modal.scss';

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
        <div className='modal'>
            <div
                className={`modal__overlay ${overlayClass || ''}`}
                onClick={!fixed ? onClose : null}
            />
            <div className={`modal__content ${modalClass || ''}`}>
                {hasButton ? (
                    <div className='modal__close'>
                        <i
                            className='material-icons md-36 modal__close-icon'
                            onClick={onClose}>
                            clear
                        </i>
                    </div>
                ) : null}
                {children}
            </div>
        </div>,
        document.getElementById('portal'),
    );
};

Modal.defaultProps = {
    hasButton: true,
};

export default Modal;
