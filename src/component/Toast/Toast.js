import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import { getIcon } from './utils';

import './Toast.scss';

const Toast = ({ position }) => {
    const { toastList, toastDispatch } = useToast();

    const handleDelete = (toast) => {
        toastDispatch({ type: TOAST_ACTIONS.DELETE, payload: toast });
    };

    return (
        <>
            <TransitionGroup className={`toast-list ${position}`}>
                {toastList.map((toast, i) => (
                    <CSSTransition
                        key={i}
                        timeout={{
                            appear: 500,
                            enter: 500,
                            exit: 250,
                        }}
                        classNames='toast-transition'>
                        <div
                            className={`toast toast--${toast.state} toast__container ${position}`}>
                            <i
                                className='material-icons md-24 toast__button'
                                onClick={() => handleDelete(toast)}>
                                clear
                            </i>

                            <div className='toast__content'>
                                <i className='material-icons md-36 toast__icon'>
                                    {getIcon(toast.state)}
                                </i>

                                <div className='toast__text-container'>
                                    <h3 className='toast__title'>
                                        {toast.title}
                                    </h3>
                                    <p className='toast__description'>
                                        {toast.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </>
    );
};

export default Toast;
