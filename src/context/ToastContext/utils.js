let TOAST_ID = 0;

export const TOAST_STATE = { SUCCESS: 0, WARNING: 1, ERROR: 2 };

export const TOAST_ACTIONS = {
    ADD: 0,
    DELETE: 1,
};

export const reducer = (state, action) => {
    const newState = [...state];
    switch (action.type) {
        case TOAST_ACTIONS.ADD:
            action.payload.id = TOAST_ID++;
            newState.push(action.payload);
            return newState;
        case TOAST_ACTIONS.DELETE:
            return deleteToast(newState, action.payload);
        default:
            throw new Error();
    }
};

const deleteToast = (toastList, toast) => {
    const index = toastList.findIndex((element) => element.id === toast.id);
    toastList.splice(index, 1);
    return toastList;
};
