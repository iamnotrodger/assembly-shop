import { TOAST_STATE } from '../../context/ToastContext';

export const getIcon = (state) => {
    switch (state) {
        case TOAST_STATE.SUCCESS:
            return '';
        case TOAST_STATE.WARNING:
            return '';
        case TOAST_STATE.ERROR:
            return '';
        default:
            return '';
    }
};

export const getBackground = (state) => {
    switch (state) {
        case TOAST_STATE.SUCCESS:
            return 'green';
        case TOAST_STATE.WARNING:
            return 'orange';
        case TOAST_STATE.ERROR:
            return 'red';
        default:
            return '';
    }
};
