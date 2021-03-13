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
                <div role='alert'>
                    <h1>{code}</h1>
                    <p>Something went wrong:</p>
                    <pre>{message}</pre>
                    <pre>Try reloading the page</pre>
                </div>
            );
    }
};

export default ErrorFallback;
