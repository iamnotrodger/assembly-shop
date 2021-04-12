import React from 'react';
import UserIcon from '../UserIcon';
import useUser from '../../context/UserContext';

const Assignee = ({ value, children }) => {
    const { user } = useUser();

    if (!value) {
        return null;
    }

    return (
        <div className='task__assignee'>
            <UserIcon value={value} />
            {user.userID === value.userID ? children : null}
        </div>
    );
};

export default Assignee;
