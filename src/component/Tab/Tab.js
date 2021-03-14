import React from 'react';

const Tab = ({ active, label, onClick }) => {
    const handleOnClick = () => {
        onClick(label);
    };

    return (
        <li
            style={{
                backgroundColor: active ? 'red' : 'blue',
                padding: '5px',
                listStyleType: 'none',
            }}
            onClick={handleOnClick}>
            {label}
        </li>
    );
};

export default Tab;
