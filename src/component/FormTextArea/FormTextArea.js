import { useFormikContext } from 'formik';
import React from 'react';
import ErrorMessage from '../ErrorMessage';

const FormTextArea = ({ name, label, ...props }) => {
    const { handleBlur, handleChange, errors, touched } = useFormikContext();

    return (
        <div className='form__group'>
            <label className='form__label'>
                {label}
                <textarea
                    className={`form__textarea ${
                        errors[name] ? 'form__input--error' : ''
                    }`}
                    onBlur={handleBlur(name)}
                    onChange={handleChange(name)}
                    {...props}
                />
                <ErrorMessage error={errors[name]} visible={touched[name]} />
            </label>
        </div>
    );
};

export default FormTextArea;
