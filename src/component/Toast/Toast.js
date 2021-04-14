import React from 'react';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import './Toast.scss';
import { getIcon } from './utils';

const Toast = ({ position }) => {
    const { toastList, toastDispatch } = useToast();

    const handleDelete = (toast) => {
        toastDispatch({ type: TOAST_ACTIONS.DELETE, payload: toast });
    };

    //TODO: Create transition on dismount
    // https://reactjs.org/docs/animation.html

    return (
        <>
            <div className={`toast-list ${position}`}>
                {toastList.map((toast, i) => (
                    <div
                        key={i}
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
                                <h3 className='toast__title'>{toast.title}</h3>
                                <p className='toast__description'>
                                    {toast.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Toast;
