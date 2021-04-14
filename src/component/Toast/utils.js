import { TOAST_STATE } from '../../context/ToastContext';

export const getIcon = (state) => {
    switch (state) {
        case TOAST_STATE.SUCCESS:
            return 'done';
        case TOAST_STATE.WARNING:
            return 'success';
        case TOAST_STATE.ERROR:
            return 'error';
        default:
            return '';
    }
};
