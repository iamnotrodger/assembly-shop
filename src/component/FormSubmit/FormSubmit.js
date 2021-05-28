import { useFormikContext } from 'formik';
import React from 'react';

const FormSubmit = ({ title = 'Submit', className = '' }) => {
    const { handleSubmit } = useFormikContext();
    return (
        <button
            type='button'
            className={`form__submit btn ${className}`}
            onClick={handleSubmit}>
            {title}
        </button>
    );
};

export default FormSubmit;
