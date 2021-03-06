export const MEMBER_ACTIONS = {
    ADD: 0,
    DELETE: 1,
    LOAD: 2,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case MEMBER_ACTIONS.LOAD:
            return sortMembers(action.payload);
        case MEMBER_ACTIONS.ADD:
            return addMember(state, action.payload);
        case MEMBER_ACTIONS.DELETE:
            return deleteMember(state, action.payload);
        default:
            throw new Error('Illegal Member Action');
    }
};

const sortMembers = (members) => {
    members.sort((a, b) => {
        if (a.admin) return -1;
        else if (b.admin) return 1;
        return a.user.email.localeCompare(b.user.email);
    });

    return members;
};

const deleteMember = (members, userID) => {
    const newMembers = [...members];
    const index = newMembers.findIndex((member) => member.userID === userID);
    if (index > -1) newMembers.splice(index, 1);
    return newMembers;
};

const addMember = (members, member) => {
    const newMembers = [...members];
    newMembers.push(member);
    return newMembers;
};
