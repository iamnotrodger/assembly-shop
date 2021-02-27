import React from 'react';

const MenuItem = ({ icon, title, onClick }) => {
    return (
        <button onClick={onClick}>
            <span>{icon}</span>
            <h3>{title}</h3>
        </button>
    );
};

export default MenuItem;
