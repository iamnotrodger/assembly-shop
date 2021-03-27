import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { createProject } from '../../api/ProjectAPI';
import { getTeamsByAdmin } from '../../api/TeamAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useTeams, {
    TEAMS_ACTIONS,
    useUsersTeams,
} from '../../context/TeamsContext';
import { validateProjectName } from '../../utils/validate';

const CreateProject = ({ onClose }) => {
    const [name, setName] = useState('');
    const [team, setTeam] = useState(null);

    const [nameError, setNameError] = useState(null);
    const [teamError, setTeamError] = useState(null);

    const { usersTeams, setUsersTeams } = useUsersTeams();
    const { teamsDispatch } = useTeams();
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
            const { teamID } = team;
            const project = await createProject({ name, teamID });

            addProjectToTeamsContext(project);
            handleRedirect(project);

            if (onClose) onClose();
        } catch (error) {
            handleError(error);
        }
        setLoading(false);
    };

    const validateForm = () => {
        let valid = true;

        const nameError = validateProjectName(name);
        const teamError = !team ? 'Team is required' : null;

        setNameError(nameError);
        setTeamError(teamError);

        if (nameError || teamError) {
            valid = false;
        }

        return valid;
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
        <div style={{ width: '50vw' }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Build Team</h2>
                </div>

                <div>
                    <label>
                        Project Name
                        <input
                            placeholder='Name'
                            value={name}
                            onChange={handleNameChange}
                        />
                        <span>{nameError}</span>
                    </label>
                </div>

                <div>
                    <label>
                        Team
                        <Select
                            placeholder='Team'
                            options={usersTeams}
                            getOptionLabel={({ name }) => name}
                            getOptionValue={({ teamID }) => teamID}
                            onChange={setTeam}
                        />
                        <span>{teamError}</span>
                    </label>
                </div>

                <div>
                    <button onClick={handleSubmit}>Create Project</button>
                </div>
            </form>
        </div>
    );
};

export default CreateProject;
