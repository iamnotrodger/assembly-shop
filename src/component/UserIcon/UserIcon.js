import React from 'react';

const UserIcon = ({ value }) => {
    if (!value) {
        return null;
    }

    const { picture, givenName, familyName } = value;

    if (picture) {
        return (
            <img
                style={{ borderRadius: '50%', width: 'auto', height: '40px' }}
                src={picture}
                alt='user-icon'
            />
        );
    } else if (givenName || familyName) {
        return <div>{givenName[0] + familyName[0]}</div>;
    } else {
        return <div>icon-svg</div>;
    }
};

export default UserIcon;
