import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useProject from '../../context/ProjectContext';
import Modal from '../Modal';
import ProjectName from '../ProjectName';
import ProjectSettings from '../ProjectSettings';

const ProjectHeader = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { project, team, isAdmin, setProject } = useProject();
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
        <div>
            <ProjectName
                name={project.name}
                projectID={project.projectID}
                teamID={project.teamID}
                editable={isAdmin}
                onSave={handleProjectNameSave}>
                <div style={{ backgroundColor: '#cce6ff' }}>
                    <h3>{project.name}</h3>
                </div>
            </ProjectName>

            <Link to={teamLink}>
                <div style={{ backgroundColor: '#cce6ff' }}>
                    <h3>{team.name}</h3>
                </div>
            </Link>

            <div onClick={handleSettingsToggle}>settings</div>

            <Modal isOpen={isSettingsOpen} onClose={handleSettingsToggle}>
                <ProjectSettings />
            </Modal>
        </div>
    );
};

export default ProjectHeader;
