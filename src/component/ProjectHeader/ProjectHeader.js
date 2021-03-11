import React from 'react';
import { Link } from 'react-router-dom';
import { updateProjectName } from '../../api/ProjectAPI';
import useProject from '../../context/ProjectContext';
import { validateProjectName } from '../CreateProject/utils';
import InputEditable from '../InputEditable/InputEditable';

const ProjectHeader = () => {
    const { project, team, isAdmin, setProject } = useProject();
    const teamLink = `/team/${team.teamID}/${team.name
        .replace(/\s+/g, '-')
        .toLowerCase()}`;

    const handleProjectNameSave = async (name) => {
        try {
            const { valid } = validateProjectName(name);
            if (!valid) return;

            const { teamID, projectID } = project;
            await updateProjectName(teamID, projectID, name);

            setProject({ ...project, ...{ name } });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <InputEditable
                text={project.name}
                onSave={handleProjectNameSave}
                editable={isAdmin}>
                <div style={{ backgroundColor: '#cce6ff' }}>
                    <h3>{project.name}</h3>
                </div>
            </InputEditable>

            <Link to={teamLink}>
                <div style={{ backgroundColor: '#cce6ff' }}>
                    <h3>{team.name}</h3>
                </div>
            </Link>

            {isAdmin ? <div>settings</div> : null}
        </div>
    );
};

export default ProjectHeader;
