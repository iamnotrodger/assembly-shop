import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { createProject } from '../../api/ProjectAPI';
import { getTeamsByAdmin } from '../../api/TeamAPI';
import { useLoadingAction } from '../../context/LoadingContext/LoadingContext';
import InputValidate from '../InputValidate/InputValidate';

const CreateProject = ({ onClose }) => {
    const [name, setName] = useState('');
    const [team, setTeam] = useState(null);
    const [teamOptions, setTeamOptions] = useState([]);
    const [isValid, setIsValid] = useState(false);

    const setLoading = useLoadingAction();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const teams = await getTeamsByAdmin();
                setTeamOptions(teams);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, [setLoading]);

    const handleNameChange = (value, valid) => {
        setName(value);
        setIsValid(valid);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const project = await createProject(name, team.teamID);
            handleRedirect(project);
            if (onClose) onClose();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const handleRedirect = (project) => {
        const {
            projectID,
            name,
            team: { teamID },
        } = project;
        const linkName = name.replace(/\s+/g, '-').toLowerCase();
        history.push(`team/${teamID}/project/${projectID}/${linkName}`);
    };

    return (
        <div style={{ width: '50vw' }}>
            <h3>Build Team</h3>
            <label>
                Project Name
                <InputValidate
                    required
                    placeholder='Name'
                    value={name}
                    onChange={handleNameChange}
                    validate={validateProjectName}
                />
            </label>
            <label>
                Team
                <Select
                    placeholder='Team'
                    options={teamOptions}
                    getOptionLabel={({ name }) => name}
                    getOptionValue={({ teamID }) => teamID}
                    onChange={setTeam}
                />
            </label>
            <button disabled={!isValid || !team} onClick={handleSubmit}>
                Create Project
            </button>
        </div>
    );
};

const validateProjectName = (name) => {
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

export default CreateProject;