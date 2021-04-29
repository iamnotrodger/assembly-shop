import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router';
import { deleteProject } from '../../api/ProjectAPI';
import useMembers from '../../context/MembersContext';
import useProject from '../../context/ProjectContext';
import useTeams, { TEAMS_ACTIONS } from '../../context/TeamsContext';
import AlertPanel, { ALERT_TYPE } from '../AlertPanel';
import ProjectName from '../ProjectName';

const ProjectSettings = () => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const { project, setProject } = useProject();
    const { userIsAdmin } = useMembers();
    const handleError = useErrorHandler();
    const history = useHistory();
    const { teamsDispatch } = useTeams();

    const handleProjectNameSave = async (name) => {
        setProject({ ...project, ...{ name } });
    };

    const handleDeleteProject = async () => {
        try {
            const { projectID } = project;
            await deleteProject(projectID);
            deleteProjectOnTeamsContext(project);
            handleRedirect();
        } catch (error) {
            handleError(error);
        }
    };

    const deleteProjectOnTeamsContext = (project) => {
        teamsDispatch({
            type: TEAMS_ACTIONS.DELETE_PROJECT,
            payload: project,
        });
    };

    const handleRedirect = () => {
        history.push('/');
    };

    const handleAlertToggle = () => {
        setIsAlertOpen(!isAlertOpen);
    };

    return (
        <div className='form'>
            <h2 className='form__title heading-secondary'>Project Settings</h2>

            <div className='form__group'>
                <label className='form__label'>
                    Project Name
                    <ProjectName
                        className='form__input'
                        name={project.name}
                        projectID={project.projectID}
                        teamID={project.teamID}
                        editable={userIsAdmin}
                        onSave={handleProjectNameSave}
                        hasButton={true}>
                        <div className='form__input'>{project.name}</div>
                    </ProjectName>
                </label>
            </div>

            <button
                className='form__submit btn btn--critical'
                disabled={!userIsAdmin}
                onClick={handleAlertToggle}>
                Delete Project
            </button>

            <AlertPanel
                type={ALERT_TYPE.CRITICAL}
                title='Permanently Delete the Project?'
                submitText='Delete'
                isOpen={isAlertOpen}
                onSubmit={handleDeleteProject}
                onClose={handleAlertToggle}
            />
        </div>
    );
};

export default ProjectSettings;
