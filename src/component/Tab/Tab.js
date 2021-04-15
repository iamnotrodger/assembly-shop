import React from 'react';

import './Tab.scss';

const Tab = ({ active, label, onClick }) => {
    const handleOnClick = () => {
        onClick(label);
    };

    return (
        <li
            className={`tab ${active ? 'tab--active' : ''}`}
            onClick={handleOnClick}>
            {label}
        </li>
    );
};

export default Tab;
