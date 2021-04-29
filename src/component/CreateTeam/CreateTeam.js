import React, { useState } from 'react';
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
import { validateTeamName } from '../../utils/validate';
import SearchSelect from '../SearchSelect';

const CreateTeam = ({ onClose }) => {
    const [name, setName] = useState('');
    const [members, setMembers] = useState([]);

    const [nameError, setNameError] = useState(null);

    const { teamsDispatch } = useTeams();
    const { userTeamsDispatch } = useUsersTeams();
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
        <form className='form' onSubmit={handleSubmit}>
            <h2 className='form__title heading-secondary'>Build Team</h2>

            <div className='form__group'>
                <label className='form__label'>
                    Team Name
                    <input
                        className={`form__input ${
                            nameError ? 'form__input--error' : ''
                        }`}
                        type='text'
                        placeholder='Name'
                        onChange={handleNameChange}
                    />
                    <span className='form__error'>{nameError}</span>
                </label>
            </div>

            <div className='form__group'>
                <label className='form__label'>
                    Invite Members
                    <SearchSelect
                        className='form__select'
                        classNamePrefix='form__select'
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

            <button className='form__submit btn'>Create Team</button>
        </form>
    );
};

export default CreateTeam;
