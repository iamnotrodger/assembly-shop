import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useUser from '../../context/UserContext';
import CreateTeam from '../CreateTeam';
import DropdownMenu from '../DropdownMenu';
import MenuItem from '../MenuItem';
import Modal from '../Modal/Modal';

const NavBar = () => {
    const { Logout } = useUser();
    const [isTeamOpen, setIsTeamOpen] = useState(false);
    const [isProjectOpen, setIsProjectOpen] = useState(false);

    const handleTeamToggle = () => {
        setIsTeamOpen(!isTeamOpen);
    };

    const handleProjectToggle = () => {
        setIsProjectOpen(!isProjectOpen);
    };

    return (
        <div>
            <NavLink exact to='/' activeStyle={{ display: 'none' }}>
                Back
            </NavLink>

            <h2>Assembly Shop</h2>

            <DropdownMenu header='Create'>
                <MenuItem title='Create Team' onClick={handleTeamToggle} />
                <MenuItem
                    title='Create Project'
                    onClick={handleProjectToggle}
                />
            </DropdownMenu>

            <DropdownMenu header='Profile'>
                <MenuItem title='Logout' onClick={Logout} />
            </DropdownMenu>

            <Modal isOpen={isTeamOpen} onClose={handleTeamToggle}>
                <CreateTeam onClose={handleTeamToggle} />
            </Modal>

            <Modal isOpen={isProjectOpen} onClose={handleProjectToggle}>
                <div>Build Project</div>
            </Modal>
        </div>
    );
};

export default NavBar;
