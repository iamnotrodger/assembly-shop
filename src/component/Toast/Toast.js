import React from 'react';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import './Toast.scss';
import { getBackground, getIcon } from './utils';

const Toast = ({ position }) => {
    const { toastList, toastDispatch } = useToast();

    const handleDelete = (toast) => {
        toastDispatch({ type: TOAST_ACTIONS.DELETE, payload: toast });
    };

    //TODO: Create transition on dismount
    // https://reactjs.org/docs/animation.html

    return (
        <>
            <div className={`notification-container ${position}`}>
                {toastList.map((toast, i) => (
                    <div
                        key={i}
                        className={`notification toast ${position}`}
                        style={{ background: getBackground(toast.state) }}>
                        <button onClick={() => handleDelete(toast)}>X</button>
                        <div className='notification-image'>
                            <img src={getIcon(toast.state)} alt='' />
                        </div>
                        <div>
                            <p className='notification-title'>{toast.title}</p>
                            <p className='notification-message'>
                                {toast.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Toast;
