import React from 'react';

const NotAuthorized = ({ message }) => {
    return (
        <div>
            <h1>403 Not Authorized</h1>
            <p>{message}</p>
        </div>
    );
};

export default NotAuthorized;
