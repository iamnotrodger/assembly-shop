import { TOAST_STATE } from '../context/ToastContext';

export const createErrorToast = (description) => {
    return {
        state: TOAST_STATE.ERROR,
        title: 'Something went wrong',
        description,
    };
};
