import React from 'react';
import UserIcon from '../UserIcon';
import useUser from '../../context/UserContext';

const Assignee = ({ value, children }) => {
    const { user } = useUser();

    if (!value) {
        return null;
    }

    return (
        <div>
            <UserIcon value={value} />
            <div>{user.userID === value.userID ? children : null}</div>
        </div>
    );
};

export default Assignee;
