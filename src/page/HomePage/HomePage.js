import React, { useEffect, useState } from 'react';
import { getTeamAndProjects } from '../../api/ProjectAPI';
import TeamSection from '../../component/TeamSection';
import useAuth, { AUTH_ACTIONS } from '../../context/AuthContext';
import { useGlobalActionSpinner } from '../../context/GlobalSpinnerContext';

const HomePage = () => {
    const [teams, setTeams] = useState([]);

    const { authDispatch } = useAuth();
    const setGlobalSpinner = useGlobalActionSpinner();

    useEffect(() => {
        (async () => {
            setGlobalSpinner(true);
            try {
                const accessToken = await authDispatch({
                    type: AUTH_ACTIONS.GET_TOKEN,
                });

                const teams = await getTeamAndProjects(accessToken);
                setTeams(teams);
            } catch (error) {
                console.error(error);
            }
            setGlobalSpinner(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                {teams.map(({ team }) => (
                    <TeamSection team={team} key={team.teamID} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
