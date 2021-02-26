import React from 'react';

const MenuItem = ({ icon, title, onClick }) => {
    return (
        <button onClick={onClick}>
            <span>{icon}</span>
            <span>{title}</span>
        </button>
    );
};

export default MenuItem;
