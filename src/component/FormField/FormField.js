import { useFormikContext } from 'formik';
import React from 'react';
import ErrorMessage from '../ErrorMessage';

const FormField = ({ name, label, ...props }) => {
    const { errors, touched, handleBlur, handleChange } = useFormikContext();

    return (
        <div className='form__group'>
            <label className='form__label'>
                {label}
                <input
                    className={`form__input ${
                        touched[name] && errors[name]
                            ? 'form__input--error'
                            : ''
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

export default FormField;
