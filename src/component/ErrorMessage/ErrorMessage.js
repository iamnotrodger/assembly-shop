import React from 'react';

const ErrorMessage = ({ error, visible }) => {
    if (!visible || !error) return null;

    return <span className='form__error'>{error}</span>;
};

export default ErrorMessage;
