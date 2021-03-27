import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import { createTeam } from '../../api/TeamAPI';
import { getUsers } from '../../api/UserAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useTeams, {
    TEAMS_ACTIONS,
    useUsersTeams,
} from '../../context/TeamsContext';
import { validateTeamName } from '../../utils/validate';
import SearchSelect from '../SearchSelect';

const CreateTeam = ({ onClose }) => {
    const [name, setName] = useState('');
    const [members, setMembers] = useState([]);

    const [nameError, setNameError] = useState(null);

    const { teamsDispatch } = useTeams();
    const { usersTeams, setUsersTeams } = useUsersTeams();
    const setLoading = useLoadingAction();
    const handleError = useErrorHandler();
    const history = useHistory();

    const handleNameChange = (event) => {
        const { value } = event.target;
        setName(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const valid = validateForm();
        if (!valid) return;

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

    const validateForm = () => {
        const error = validateTeamName(name);
        setNameError(error);
        return error == null;
    };

    const addTeamToTeamsContext = (team) => {
        teamsDispatch({ type: TEAMS_ACTIONS.ADD, payload: team });
        if (usersTeams) {
            usersTeams.push(team);
            setUsersTeams(usersTeams);
        }
    };

    const handleRedirect = (team) => {
        const { teamID, name } = team;
        const linkName = name.replace(/\s+/g, '-').toLowerCase();
        history.push(`/team/${teamID}/${linkName}`);
    };

    return (
        <div style={{ width: '50vw' }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Build Team</h2>
                </div>

                <div>
                    <label>
                        Team Name
                        <input
                            type='text'
                            placeholder='Team Name'
                            onChange={handleNameChange}
                        />
                        <span>{nameError}</span>
                    </label>
                </div>

                <div>
                    <label>
                        Members
                        <SearchSelect
                            id='team-members'
                            search={getUsers}
                            isMulti
                            key={members.length}
                            placeholder='Email'
                            value={members}
                            getOptionLabel={({ email }) => email}
                            getOptionValue={({ userID }) => userID}
                            onChange={setMembers}
                            closeMenuOnSelect={false}
                        />
                    </label>
                </div>

                <div>
                    <button>Create Team</button>
                </div>
            </form>
        </div>
    );
};

export default CreateTeam;
