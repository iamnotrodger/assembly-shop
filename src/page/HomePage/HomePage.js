import React, { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { getTeamAndProjects } from '../../api/ProjectAPI';
import TeamSection from '../../component/TeamSection';
import { useLoadingAction } from '../../context/LoadingContext';
import useTeams, { TEAMS_ACTIONS } from '../../context/TeamsContext';

import './HomePage.scss';

const HomePage = () => {
    const { teams, teamsDispatch } = useTeams();

    const setLoading = useLoadingAction();
    const handleError = useErrorHandler();

    useEffect(() => {
        if (!teams) {
            (async () => {
                setLoading(true);
                try {
                    const teams = await getTeamAndProjects();
                    teamsDispatch({ type: TEAMS_ACTIONS.LOAD, payload: teams });
                } catch (error) {
                    handleError(error);
                }
                setLoading(false);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!teams) return null;

    return (
        <main className='home-page'>
            {teams.length > 0 ? (
                <div>
                    {teams.map((team) => (
                        <TeamSection value={team} key={team.teamID} />
                    ))}
                </div>
            ) : (
                <h2 className='heading-secondary home-page__title'>
                    <i className='material-icons md-48'>groups</i>
                    No Teams Available
                </h2>
            )}
        </main>
    );
};

export default HomePage;
