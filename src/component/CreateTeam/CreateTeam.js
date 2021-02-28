import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { createTeam } from '../../api/TeamAPI';
import { getUsers } from '../../api/UserAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useDebounce from '../../hook/useDebounce';
import InputValidate from '../InputValidate/InputValidate';

const CreateTeam = () => {
    const [name, setName] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [search, setSearch] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [memberOptions, setMemberOptions] = useState([]);
    const [members, setMembers] = useState([]);

    const setLoading = useLoadingAction();
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
            handleRedirect(team);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleRedirect = (team) => {
        const { teamID, name } = team;
        const linkName = name.replace(/\s+/g, '-').toLowerCase();
        history.push(`/team/${teamID}/${linkName}`);
    };

    return (
        <div>
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

const validateTeamName = (name) => {
    let valid = true;
    let error = '';

    if (!name) {
        valid = false;
        error = 'Team name is required';
    } else if (name.length > 100) {
        valid = false;
        error = "Team name can't be longer than 100 characters";
    } else if (name.match(/[!@#$%^&*()+=[\]{};:"\\|,.<>/?]/)) {
        valid = false;
        error = 'Special characters are not allowed';
    }

    return { valid, error };
};

export default CreateTeam;
