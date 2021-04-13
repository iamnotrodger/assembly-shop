import React from 'react';

const MenuItem = ({ className, onClick, children }) => {
    return (
        <li className={className} onClick={onClick}>
            {children}
        </li>
    );
};

export default MenuItem;
