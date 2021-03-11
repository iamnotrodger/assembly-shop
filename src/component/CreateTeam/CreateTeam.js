import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import useTeams from '../../context/TeamsContext';
import { createTeam } from '../../api/TeamAPI';
import { getUsers } from '../../api/UserAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useDebounce from '../../hook/useDebounce';
import InputValidate from '../InputValidate/InputValidate';
import { validateTeamName } from '../../utils/validate';

const CreateTeam = ({ onClose }) => {
    const [name, setName] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [search, setSearch] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [memberOptions, setMemberOptions] = useState([]);
    const [members, setMembers] = useState([]);

    const { teams, setTeams } = useTeams();
    const setLoading = useLoadingAction();
    const handleError = useErrorHandler();
    const history = useHistory();
    const loadMembers = useDebounce(async (input) => {
        setSearchLoading(true);
        try {
            const users = await getUsers(input);
            setMemberOptions(users);
        } catch (error) {
            console.log(error);
        }
        setSearchLoading(false);
    }, 250);

    useEffect(() => {
        return loadMembers.cancel();
    }, [loadMembers]);

    const handleNameChange = (value, valid) => {
        setName(value);
        setIsValid(valid);
    };

    const handleSearchChange = (value) => {
        setSearch(value);
        if (value) loadMembers(value);
        else setMemberOptions([]);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const team = await createTeam({ name, members });

            addTeamToTeamsContext();
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
        setTeams(team);
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
                <Select
                    isMulti
                    key={members.length}
                    placeholder='Email'
                    inputValue={search}
                    onInputChange={handleSearchChange}
                    value={members}
                    options={memberOptions}
                    getOptionLabel={({ email }) => email}
                    getOptionValue={({ userID }) => userID}
                    onChange={setMembers}
                    closeMenuOnSelect={false}
                    isLoading={searchLoading}
                />
            </label>
            <button disabled={!isValid} onClick={handleSubmit}>
                Create Team
            </button>
        </div>
    );
};

export default CreateTeam;
