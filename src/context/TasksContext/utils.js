export const TASK_ACTIONS = {
    ADD: 1,
    UPDATE: 2,
    DELETE: 3,
    LOAD: 4,
};

export const reducer = (state, action) => {
    const newState = [...state];
    switch (action.type) {
        case TASK_ACTIONS.ADD:
            newState.push(action.payload);
            return newState;
        case TASK_ACTIONS.UPDATE:
            newState[action.payload.index] = action.payload;
            return newState;
        case TASK_ACTIONS.DELETE:
            newState.splice(action.payload.index, 1);
            return newState;
        case TASK_ACTIONS.LOAD:
            return action.payload;
        default:
            throw new Error();
    }
};
