import React, { useState } from 'react';

const InputValidate = ({ value, placeholder, onChange, validate }) => {
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const { value } = event.target;
        const error = validate(value);
        const valid = error == null;

        onChange(value, valid);
        setError(error);
    };

    return (
        <div>
            <input
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
            />
            <div>{error}</div>
        </div>
    );
};

export default InputValidate;
