import { useFormikContext } from 'formik';
import React from 'react';
import ErrorMessage from '../ErrorMessage';
import SearchSelect from '../SearchSelect';

const FormSearchSelect = ({ name, label, search, ...props }) => {
    const { values, errors, touched, setFieldValue, handleBlur } =
        useFormikContext();

    return (
        <div className='form__group'>
            <label className='form__label'>
                {label}
                <SearchSelect
                    className={`form__select ${
                        touched[name] && errors[name]
                            ? 'form__input--error'
                            : ''
                    }`}
                    key={values[name].length}
                    value={values[name]}
                    onChange={(value) => setFieldValue(name, value)}
                    onBlur={handleBlur(name)}
                    search={search}
                    {...props}
                />
                <ErrorMessage error={errors[name]} visible={touched[name]} />
            </label>
        </div>
    );
};

export default FormSearchSelect;
