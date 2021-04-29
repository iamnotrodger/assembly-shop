import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useUser from '../../context/UserContext';
import CreateProject from '../CreateProject';
import CreateTeam from '../CreateTeam';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import Modal from '../Modal';
import UserIcon from '../UserIcon';

import './NavBar.scss';

const NavBar = () => {
    const { Logout } = useUser();
    const [isTeamOpen, setIsTeamOpen] = useState(false);
    const [isProjectOpen, setIsProjectOpen] = useState(false);

    const { user } = useUser();

    const handleTeamToggle = () => {
        setIsTeamOpen(!isTeamOpen);
    };

    const handleProjectToggle = () => {
        setIsProjectOpen(!isProjectOpen);
    };

    return (
        <header className='nav-bar'>
            <Link className='nav-bar__link' to='/'>
                <h1 className='heading-primary nav-bar__title'>
                    Assembly-Shop
                </h1>
            </Link>

            <nav className='nav' style={user ? null : { display: 'none' }}>
                <Menu
                    className='nav__menu'
                    header={
                        <i className='material-icons md-36 md-circle nav__header'>
                            add
                        </i>
                    }>
                    <MenuItem className='nav__item' onClick={handleTeamToggle}>
                        <i className='material-icons md-36'>groups</i>
                        <h2 className='heading-secondary'>Create Team</h2>
                    </MenuItem>
                    <MenuItem
                        className='nav__item'
                        onClick={handleProjectToggle}>
                        <i className='material-icons md-36'>ballot</i>
                        <h2 className='heading-secondary'>Create Project</h2>
                    </MenuItem>
                </Menu>

                <Menu
                    className='nav__menu'
                    header={<UserIcon className='nav__header' value={user} />}>
                    <MenuItem className='nav__item' onClick={Logout}>
                        <i className='material-icons md-36'>logout</i>
                        <h2 className='heading-secondary'>Logout</h2>
                    </MenuItem>
                </Menu>
            </nav>

            <Modal isOpen={isTeamOpen} onClose={handleTeamToggle}>
                <CreateTeam onClose={handleTeamToggle} />
            </Modal>

            <Modal isOpen={isProjectOpen} onClose={handleProjectToggle}>
                <CreateProject onClose={handleProjectToggle} />
            </Modal>
        </header>
    );
};

export default NavBar;
