import React from 'react';

const NotFound = ({ message }) => {
    return (
        <main className='error-fallback'>
            <i className='material-icons error-fallback__icon'>search_off</i>
            <h1 className='error-fallback__code'>404 </h1>
            <h2 className='error-fallback__title'>Not Found </h2>
            <p className='error-fallback__message'>{message}</p>
        </main>
    );
};

export default NotFound;
