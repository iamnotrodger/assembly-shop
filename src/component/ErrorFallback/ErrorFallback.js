import React from 'react';
import NotFound from '../NotFound';

const ErrorFallback = ({ error }) => {
    const { message, code } = error;

    switch (code) {
        case 404:
            return <NotFound message={message} />;
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
