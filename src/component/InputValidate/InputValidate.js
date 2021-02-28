import React, { useState } from 'react';

const InputValidate = ({ value, placeholder, onChange, validate }) => {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { value } = event.target;
        const { valid, error } = validate(value);
        onChange(value, valid);
        setHasError(!valid);
        setError(error);
    };

    return (
        <div>
            <input
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                style={{ borderColor: hasError ? 'red' : null }}
            />
            <div>{error}</div>
        </div>
    );
};

export default InputValidate;
