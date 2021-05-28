import React, { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import { createProject } from '../../api/ProjectAPI';
import { getTeamsByAdmin } from '../../api/TeamAPI';
import useTeams, {
    TEAMS_ACTIONS,
    USER_TEAMS_ACTIONS,
    useUsersTeams,
} from '../../context/TeamsContext';
import { ProjectSchema } from '../../utils/validate';
import Form from '../Form';
import FormField from '../FormField';
import FormSelect from '../FormSelect';
import FormSubmit from '../FormSubmit';

const CreateProject = ({ onClose }) => {
    const { usersTeams, userTeamsDispatch } = useUsersTeams();
    const { teamsDispatch } = useTeams();
    const handleError = useErrorHandler();
    const history = useHistory();

    useEffect(() => {
        if (!usersTeams) {
            (async () => {
                try {
                    const teams = await getTeamsByAdmin();
                    userTeamsDispatch({
                        type: USER_TEAMS_ACTIONS.LOAD,
                        payload: teams,
                    });
                } catch (error) {
                    console.log(error);
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async ({ name, team }) => {
        try {
            const { teamID } = team;
            const project = await createProject({ name, teamID });
            addProjectToTeamsContext(project);
            handleRedirect(project);
            if (onClose) onClose();
        } catch (error) {
            handleError(error);
        }
    };

    const addProjectToTeamsContext = (project) => {
        teamsDispatch({ type: TEAMS_ACTIONS.ADD_PROJECT, payload: project });
    };

    const handleRedirect = (project) => {
        const { projectID, name } = project;
        const linkName = name.replace(/\s+/g, '-').toLowerCase();
        history.push(`/project/${projectID}/${linkName}`);
    };

    return (
        <Form
            initialValues={{ name: '', team: null }}
            onSubmit={handleSubmit}
            validationSchema={ProjectSchema}>
            <h2 className='form__title heading-secondary'>Build Project</h2>
            <FormField
                name='name'
                label='Project Name'
                placeholder='Project Name'
            />
            <FormSelect
                name='team'
                label='Team'
                placeholder='Select Team'
                options={usersTeams}
                getOptionLabel={({ name }) => name}
                getOptionValue={({ teamID }) => teamID}
            />
            <FormSubmit title='Create Project' />
        </Form>
    );
};

export default CreateProject;
