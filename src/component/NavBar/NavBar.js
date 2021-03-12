import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useUser from '../../context/UserContext';
import CreateProject from '../CreateProject';
import CreateTeam from '../CreateTeam';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import Modal from '../Modal';
import UserIcon from '../UserIcon';

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
        <div>
            <NavLink exact to='/' activeStyle={{ display: 'none' }}>
                Back
            </NavLink>

            <h2>Assembly Shop</h2>

            <Menu header={<button>Create</button>}>
                <MenuItem title='Create Team' onClick={handleTeamToggle} />
                <MenuItem
                    title='Create Project'
                    onClick={handleProjectToggle}
                />
            </Menu>

            <Menu header={<UserIcon value={user} />}>
                <MenuItem title='Logout' onClick={Logout} />
            </Menu>

            <Modal isOpen={isTeamOpen} onClose={handleTeamToggle}>
                <CreateTeam onClose={handleTeamToggle} />
            </Modal>

            <Modal isOpen={isProjectOpen} onClose={handleProjectToggle}>
                <CreateProject onClose={handleProjectToggle} />
            </Modal>
        </div>
    );
};

export default NavBar;
