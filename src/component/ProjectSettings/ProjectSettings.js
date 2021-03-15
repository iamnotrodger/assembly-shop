import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router';
import { deleteProject } from '../../api/ProjectAPI';
import useMembers from '../../context/MembersContext';
import useProject from '../../context/ProjectContext';
import useTeams from '../../context/TeamsContext';
import { removeProject } from '../../utils/project';
import AlertPanel from '../AlertPanel';
import ProjectName from '../ProjectName';

const ProjectSettings = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const { project, setProject } = useProject();
    const { userIsAdmin } = useMembers();
    const handleError = useErrorHandler();
    const history = useHistory();
    const { teams, setTeams } = useTeams();

    const handleProjectNameSave = async (name) => {
        setProject({ ...project, ...{ name } });
    };

    const handleDeleteProject = async () => {
        try {
            const { projectID } = project;
            await deleteProject(projectID);
            deleteProjectOnTeamsContext();
            handleRedirect();
        } catch (error) {
            handleError(error);
        }
    };

    const deleteProjectOnTeamsContext = () => {
        if (!teams) return;
        const newTeamsState = removeProject(teams, project);
        setTeams(newTeamsState);
    };

    const handleRedirect = () => {
        history.push('/');
    };

    const handleAlertToggle = () => {
        setIsAlertOpen(!isAlertOpen);
    };

    return (
        <div>
            <div>
                <h1>Project Settings</h1>
            </div>

            <label>
                Project Name
                <ProjectName
                    name={project.name}
                    projectID={project.projectID}
                    teamID={project.teamID}
                    editable={userIsAdmin}
                    onSave={handleProjectNameSave}
                    hasButton={true}>
                    <h2>{project.name}</h2>
                </ProjectName>
            </label>

            <div>
                <button disabled={!userIsAdmin} onClick={handleAlertToggle}>
                    Delete Project
                </button>
            </div>

            <AlertPanel
                isOpen={isAlertOpen}
                message='Deleting the project cannot be undone. All the following tasks withing the project will be deleted.'
                onSubmit={handleDeleteProject}
                onClose={handleAlertToggle}
            />
        </div>
    );
};

export default ProjectSettings;
