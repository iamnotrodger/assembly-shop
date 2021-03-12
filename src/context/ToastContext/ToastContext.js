import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { reducer, TOAST_ACTIONS } from './utils';

const ToastContext = createContext();

export const ToastProvider = ({ autoDelete, dismissTime, children }) => {
    const [toastList, toastDispatch] = useReducer(reducer, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length) {
                toastDispatch({
                    type: TOAST_ACTIONS.DELETE,
                    payload: toastList[0],
                });
            }
        }, dismissTime);

        return () => clearInterval(interval);
    }, [toastList, autoDelete, dismissTime]);

    return (
        <ToastContext.Provider value={{ toastList, toastDispatch }}>
            {children}
        </ToastContext.Provider>
    );
};

const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export default useToast;
