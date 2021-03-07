import React from 'react';
import useUser from '../../context/UserContext';

const Assignee = ({ value, children }) => {
    const { user } = useUser();

    if (!value) {
        return null;
    }

    return (
        <div>
            <div>{user.userID === value.userID ? children : null}</div>
        </div>
    );
};

export default Assignee;
