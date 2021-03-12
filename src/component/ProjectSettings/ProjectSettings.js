import React from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router';
import { deleteProject } from '../../api/ProjectAPI';
import useProject from '../../context/ProjectContext';
import useTeams from '../../context/TeamsContext';
import { removeProject } from '../../utils/project';
import ProjectName from '../ProjectName';

const ProjectSettings = () => {
    const { project, isAdmin, setProject } = useProject();
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
                    editable={isAdmin}
                    onSave={handleProjectNameSave}
                    hasButton={true}>
                    <h2>{project.name}</h2>
                </ProjectName>
            </label>

            <div>
                <button disabled={!isAdmin} onClick={handleDeleteProject}>
                    Delete Project
                </button>
                <p>
                    <b>Warning: </b> deleting the project cannot be undone. All
                    the following tasks will also be deleted.
                </p>
            </div>
        </div>
    );
};

export default ProjectSettings;
