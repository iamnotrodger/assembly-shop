import React from 'react';
import Modal from '../Modal';

import './AlertPanel.scss';

const AlertPanel = ({
    type,
    title,
    message,
    submitText,
    cancelText,
    isOpen,
    onSubmit,
    onClose,
}) => {
    return (
        <Modal
            modalClass='alert-panel__modal'
            overlayClass='alert-panel__modal-overlay'
            fixed
            isOpen={isOpen}
            onClose={onClose}
            timeout={0}
            hasButton={false}>
            <div className={`alert-panel alert-panel--${type}`}>
                <div className='alert-panel__text-container'>
                    <h3 className='heading-tertiary alert-panel__title'>
                        {title || 'Are you sure?'}
                    </h3>
                    {message ? (
                        <p className='alert-panel__message'>{message}</p>
                    ) : null}
                </div>

                <div className='alert-panel__button-container'>
                    <button
                        className={`alert-panel--${type} alert-panel__button alert-panel__button--submit`}
                        onClick={onSubmit}>
                        {submitText || 'Submit'}
                    </button>
                    <button
                        className={`alert-panel--${type} alert-panel__button alert-panel__button--cancel`}
                        onClick={onClose}>
                        {cancelText || 'Cancel'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

AlertPanel.defaultProps = {
    type: 'normal',
};

export default AlertPanel;
