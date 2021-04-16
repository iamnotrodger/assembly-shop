import React from 'react';

const NotAuthorized = ({ message }) => {
    return (
        <main className='error-fallback'>
            <i className='material-icons error-fallback__icon'>
                remove_moderator
            </i>
            <h1 className='error-fallback__code'>403 </h1>
            <h2 className='error-fallback__title'>Not Authorized </h2>
            <p className='error-fallback__message'>{message}</p>
        </main>
    );
};

export default NotAuthorized;
