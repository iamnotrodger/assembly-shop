import React from 'react';
import NotAuthorized from '../NotAuthorized';
import NotFound from '../NotFound';

const ErrorFallback = ({ error: { message, code } }) => {
    switch (code) {
        case 404:
            return <NotFound message={message} />;
        case 403:
            return <NotAuthorized message={message} />;
        default:
            return (
                <main role='alert' className='error-fallback'>
                    <i className='material-icons error-fallback__icon'>error</i>
                    <h1 className='error-fallback__code'>{code}</h1>
                    <h2 className='error-fallback__title'>
                        Something went wrong
                    </h2>
                    <p className='error-fallback__message'>{message}</p>
                    <p className='error-fallback__message'>
                        Try reloading the page
                    </p>
                </main>
            );
    }
};

export default ErrorFallback;
