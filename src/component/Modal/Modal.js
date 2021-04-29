import React from 'react';
import ReactDom from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './Modal.scss';

const Modal = ({
    isOpen,
    onClose,
    fixed,
    hasButton,
    overlayClass,
    modalClass,
    transitionTime,
    children,
    ...props
}) => {
    return ReactDom.createPortal(
        <CSSTransition in={isOpen} unmountOnExit {...props}>
            <div className='modal'>
                <div
                    className={`modal__overlay ${overlayClass || ''}`}
                    onClick={!fixed ? onClose : null}
                />
                <div
                    className={`modal__content ${modalClass || ''} ${
                        hasButton ? 'modal__content--with-button' : ''
                    }`}>
                    {hasButton ? (
                        <div className='modal__close'>
                            <i
                                className='material-icons md-36 modal__close-icon animate-hover-white'
                                onClick={onClose}>
                                clear
                            </i>
                        </div>
                    ) : null}
                    <div className='modal__children'>{children}</div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('portal'),
    );
};

Modal.defaultProps = {
    hasButton: true,
};

export default Modal;
