import React from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import { createTeam } from '../../api/TeamAPI';
import { getUsers } from '../../api/UserAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useTeams, {
    TEAMS_ACTIONS,
    USER_TEAMS_ACTIONS,
    useUsersTeams,
} from '../../context/TeamsContext';
import { TeamSchema } from '../../utils/validate';
import Form from '../Form/Form';
import FormField from '../FormField';
import FormSearchSelect from '../FormSearchSelect';
import FormSubmit from '../FormSubmit';

const CreateTeam = ({ onClose }) => {
    const { teamsDispatch } = useTeams();
    const { userTeamsDispatch } = useUsersTeams();
    const setLoading = useLoadingAction();
    const handleError = useErrorHandler();
    const history = useHistory();

    const handleSubmit = async ({ name, members }) => {
        setLoading(true);
        try {
            const team = await createTeam({ name, members });

            addTeamToTeamsContext(team);
            handleRedirect(team);

            if (onClose) onClose();
        } catch (error) {
            handleError(error);
        }
        setLoading(false);
    };

    const addTeamToTeamsContext = (team) => {
        teamsDispatch({ type: TEAMS_ACTIONS.ADD, payload: team });
        userTeamsDispatch({
            type: USER_TEAMS_ACTIONS.ADD,
            payload: team,
        });
    };

    const handleRedirect = (team) => {
        const { teamID, name } = team;
        const linkName = name.replace(/\s+/g, '-').toLowerCase();
        history.push(`/team/${teamID}/${linkName}`);
    };

    return (
        <Form
            initialValues={{ name: '', members: [] }}
            onSubmit={handleSubmit}
            validationSchema={TeamSchema}>
            <h2 className='form__title heading-secondary'>Build Team</h2>
            <FormField name='name' label='Team Name' placeholder='Team Name' />
            <FormSearchSelect
                isMulti
                name='members'
                label='Invite Members'
                id='team-members'
                search={getUsers}
                placeholder='Search Email'
                getOptionLabel={({ email }) => email}
                getOptionValue={({ userID }) => userID}
                closeMenuOnSelect={false}
            />
            <FormSubmit title='Create Team' />
        </Form>
    );
};

export default CreateTeam;
