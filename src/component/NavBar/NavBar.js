import React from 'react';
import { NavLink } from 'react-router-dom';
import useUser from '../../context/UserContext';
import DropdownMenu from '../DropdownMenu';
import MenuItem from '../MenuItem';
import Popup from '../Popup';

const NavBar = () => {
    const { Logout } = useUser();

    return (
        <div>
            <NavLink exact to='/' activeStyle={{ display: 'none' }}>
                Back
            </NavLink>

            <h2>Assembly Shop</h2>

            <DropdownMenu header='Create'>
                <Popup trigger={<MenuItem title='Create Team' />}>
                    <div>Create Team Pop Up</div>
                </Popup>

                <Popup trigger={<MenuItem title='Create Project' />}>
                    <div>Create Project Pop Up</div>
                </Popup>
            </DropdownMenu>

            <DropdownMenu header='Profile'>
                <MenuItem title='Logout' onClick={Logout} />
            </DropdownMenu>
        </div>
    );
};

export default NavBar;
