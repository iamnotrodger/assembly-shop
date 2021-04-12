import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useMembers from '../../context/MembersContext';
import useProject from '../../context/ProjectContext';
import Modal from '../Modal';
import ProjectName from '../ProjectName';
import ProjectSettings from '../ProjectSettings';

import './ProjectHeader.scss';

const ProjectHeader = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { project, team, setProject } = useProject();
    const { userIsAdmin } = useMembers();

    const teamLink = `/team/${team.teamID}/${team.name
        .replace(/\s+/g, '-')
        .toLowerCase()}`;

    const handleProjectNameSave = async (name) => {
        setProject({ ...project, ...{ name } });
    };

    const handleSettingsToggle = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    return (
        <header className='project-header'>
            <ProjectName
                name={project.name}
                projectID={project.projectID}
                teamID={project.teamID}
                editable={userIsAdmin}
                onSave={handleProjectNameSave}>
                <h3 className='heading-tertiary project-header__project-name'>
                    {project.name}
                </h3>
            </ProjectName>

            <Link className='project-header__team-name' to={teamLink}>
                {team.name}
            </Link>

            <i
                className='material-icons md-36 project-header__settings'
                onClick={handleSettingsToggle}>
                settings
            </i>

            <Modal isOpen={isSettingsOpen} onClose={handleSettingsToggle}>
                <ProjectSettings />
            </Modal>
        </header>
    );
};

export default ProjectHeader;
