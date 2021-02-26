import React, { useEffect, useState } from 'react';
import { getTeamAndProjects } from '../../api/ProjectAPI';
import TeamSection from '../../component/TeamSection';
import { useLoadingAction } from '../../context/LoadingContext';

const HomePage = () => {
    const [teams, setTeams] = useState([]);

    const setLoading = useLoadingAction();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const teams = await getTeamAndProjects();
                setTeams(teams);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const teamMaps =
        teams.length > 0 ? (
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
