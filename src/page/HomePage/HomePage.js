import React, { useEffect } from 'react';
import { getTeamAndProjects } from '../../api/ProjectAPI';
import TeamSection from '../../component/TeamSection';
import { useLoadingAction } from '../../context/LoadingContext';
import useTeams from '../../context/TeamsContext/TeamsContext';
import useError from '../../hook/useError';

const HomePage = () => {
    const { teams, setTeams } = useTeams();

    const setLoading = useLoadingAction();
    const throwError = useError();

    useEffect(() => {
        if (!teams) {
            (async () => {
                setLoading(true);
                try {
                    const teams = await getTeamAndProjects();
                    setTeams(teams);
                } catch (error) {
                    throwError(error);
                }
                setLoading(false);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const teamMaps = teams ? (
        teams.length > 0 ? (
            <div>
                {teams.map((team) => (
                    <TeamSection value={team} key={team.teamID} />
                ))}
            </div>
        ) : (
            <div>No Teams Available</div>
        )
    ) : null;

    return <div>{teamMaps}</div>;
};

export default HomePage;
