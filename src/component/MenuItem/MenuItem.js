import React from 'react';

import './MenuItem.scss';

const MenuItem = ({ icon, title, onClick }) => {
    return (
        <li className='menu-item' onClick={onClick}>
            <i className='material-icons md-36'>{icon}</i>
            <h2 className='heading-secondary'>{title}</h2>
        </li>
    );
};

export default MenuItem;
