import React from 'react';
import { NavLink } from 'react-router-dom';
import useUser from '../../context/UserContext';
import DropdownMenu from '../DropdownMenu';
import MenuItem from '../MenuItem';

const NavBar = () => {
    const { Logout } = useUser();

    return (
        <div>
            <NavLink exact to='/' activeStyle={{ display: 'none' }}>
                Back
            </NavLink>

            <h2>Assembly Shop</h2>

            <DropdownMenu header='Create'>
                <MenuItem title='Create Team' />
                <MenuItem title='Create Project' />
            </DropdownMenu>
            <DropdownMenu header='Profile'>
                <MenuItem title='Logout' onClick={Logout} />
            </DropdownMenu>
        </div>
    );
};

export default NavBar;
