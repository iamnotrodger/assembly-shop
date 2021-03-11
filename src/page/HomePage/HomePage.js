import React, { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { getTeamAndProjects } from '../../api/ProjectAPI';
import TeamSection from '../../component/TeamSection';
import { useLoadingAction } from '../../context/LoadingContext';
import useTeams from '../../context/TeamsContext';

const HomePage = () => {
    const { teams, setTeams } = useTeams();

    const setLoading = useLoadingAction();
    const handleError = useErrorHandler();

    useEffect(() => {
        if (!teams) {
            (async () => {
                setLoading(true);
                try {
                    const teams = await getTeamAndProjects();
                    setTeams(teams);
                } catch (error) {
                    handleError(error);
                }
                setLoading(false);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const teamMaps =
        teams && teams.length > 0 ? (
            <div>
                {teams.map((team) => (
                    <TeamSection value={team} key={team.teamID} />
                ))}
            </div>
        ) : (
            <div>No Teams Available</div>
        );

    return <div>{teamMaps}</div>;
};

export default HomePage;
