import React, { useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import { createTeam } from '../../api/TeamAPI';
import { getUsers } from '../../api/UserAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useTeams from '../../context/TeamsContext';
import { validateTeamName } from '../../utils/validate';
import InputValidate from '../InputValidate';
import SearchSelect from '../SearchSelect';

const CreateTeam = ({ onClose }) => {
    const [name, setName] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [members, setMembers] = useState([]);

    const { teams, setTeams } = useTeams();
    const setLoading = useLoadingAction();
    const handleError = useErrorHandler();
    const history = useHistory();
    const handleNameChange = (value, valid) => {
        setName(value);
        setIsValid(valid);
    };

    const handleSubmit = async () => {
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
        if (!teams) return;
        teams.unshift(team);
        setTeams(teams);
    };

    const handleRedirect = (team) => {
        const { teamID, name } = team;
        const linkName = name.replace(/\s+/g, '-').toLowerCase();
        history.push(`/team/${teamID}/${linkName}`);
    };

    return (
        <div style={{ width: '50vw' }}>
            <h3>Build Team</h3>
            <label>
                Team Name
                <InputValidate
                    required
                    placeholder='Name'
                    value={name}
                    onChange={handleNameChange}
                    validate={validateTeamName}
                />
            </label>
            <label>
                Members
                <SearchSelect
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
            <button disabled={!isValid} onClick={handleSubmit}>
                Create Team
            </button>
        </div>
    );
};

export default CreateTeam;
