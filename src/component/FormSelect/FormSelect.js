import { useFormikContext } from 'formik';
import React from 'react';
import Select from 'react-select';
import ErrorMessage from '../ErrorMessage';

const FormSelect = ({ name, label, ...props }) => {
    const { errors, touched, values, setFieldValue, handleBlur } =
        useFormikContext();

    return (
        <div className='form__group'>
            <label className='form__label'>
                {label}
                <Select
                    className={`form__select ${
                        touched[name] && errors[name]
                            ? 'form__input--error'
                            : ''
                    }`}
                    value={values[name]}
                    onChange={(value) => setFieldValue(name, value)}
                    onBlur={handleBlur(name)}
                    {...props}
                />
                <ErrorMessage error={errors[name]} visible={touched[name]} />
            </label>
        </div>
    );
};

export default FormSelect;
