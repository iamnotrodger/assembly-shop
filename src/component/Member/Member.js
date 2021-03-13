import React from 'react';
import UserIcon from '../UserIcon';

const Member = ({ value, onDelete }) => {
    return (
        <div style={{ backgroundColor: 'aqua', margin: '5px', padding: '5px' }}>
            <UserIcon value={value.user} />
            <div>{value.user.email}</div>
            {onDelete ? <button onClick={onDelete}>X</button> : null}
        </div>
    );
};

export default Member;
