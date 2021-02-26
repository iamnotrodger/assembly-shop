import React from 'react';
import { NavLink } from 'react-router-dom';
import useUser from '../../context/UserContext';

const NavBar = () => {
    const { Logout } = useUser();

    return (
        <div>
            <h2>Assembly Shop</h2>
            <NavLink exact to='/' activeStyle={{ display: 'none' }}>
                Back
            </NavLink>
            <button onClick={Logout}>Logout</button>
        </div>
    );
};

export default NavBar;
