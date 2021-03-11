import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { createProject } from '../../api/ProjectAPI';
import { getTeamsByAdmin } from '../../api/TeamAPI';
import { useLoadingAction } from '../../context/LoadingContext/LoadingContext';
import useTeams, {
    useUsersTeams,
} from '../../context/TeamsContext/TeamsContext';
import { addProject } from '../../utils/project';
import InputValidate from '../InputValidate/InputValidate';
import { validateProjectName } from './utils';

const CreateProject = ({ onClose }) => {
    const [name, setName] = useState('');
    const [team, setTeam] = useState(null);
    const [isValid, setIsValid] = useState(false);

    const { usersTeams, setUsersTeams } = useUsersTeams();
    const { teams, setTeams } = useTeams();
    const setLoading = useLoadingAction();
    const handleError = useErrorHandler();
    const history = useHistory();

    useEffect(() => {
        if (!usersTeams) {
            (async () => {
                setLoading(true);
                try {
                    const teams = await getTeamsByAdmin();
                    setUsersTeams(teams);
                } catch (error) {
                    console.log(error);
                }
                setLoading(false);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNameChange = (value, valid) => {
        setName(value);
        setIsValid(valid);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const project = await createProject(name, team.teamID);

            addProjectToTeamsContext(project);
            handleRedirect(project);

            if (onClose) onClose();
        } catch (error) {
            handleError(error);
        }
        setLoading(false);
    };

    const addProjectToTeamsContext = (project) => {
        if (!teams) return;

        const newTeamsState = addProject(teams, project);
        setTeams(newTeamsState);
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
                    options={usersTeams}
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

export default CreateProject;
