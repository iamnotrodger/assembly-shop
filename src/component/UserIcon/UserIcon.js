import React from 'react';

import './UserIcon.scss';

const UserIcon = ({ value }) => {
    if (!value) {
        return null;
    }

    const { picture, givenName, familyName } = value;

    if (picture) {
        return <img className='user-icon' src={picture} alt='user-icon' />;
    } else if (givenName || familyName) {
        return (
            <div className='user-icon user-icon--name'>
                {givenName[0] + familyName[0]}
            </div>
        );
    } else {
        return (
            <i className='material-icons md-36 user-icon user-icon--icon'>
                person
            </i>
        );
    }
};

export default UserIcon;
