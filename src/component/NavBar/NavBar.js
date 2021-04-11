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
        <header className='header'>
            <Link className='header__title' to='/'>
                <h1 className='heading-primary'>Assembly-Shop</h1>
            </Link>

            <nav className='header__nav'>
                <Menu icon='add'>
                    <MenuItem
                        icon='groups'
                        title='Create Team'
                        onClick={handleTeamToggle}
                    />
                    <MenuItem
                        icon='ballot'
                        title='Create Project'
                        onClick={handleProjectToggle}
                    />
                </Menu>

                <Menu header={<UserIcon value={user} />}>
                    <MenuItem icon='logout' title='Logout' onClick={Logout} />
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
