import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router';
import { getTeam } from '../../api/TeamAPI';
import TabBoard from '../../component/TabBoard';
import TeamMembers from '../../component/TeamMembers';
import { useLoadingAction } from '../../context/LoadingContext';
import { MembersProvider } from '../../context/MembersContext';

const TeamPage = () => {
    const [team, setTeam] = useState({ name: '' });

    const { teamID } = useParams();
    const setLoading = useLoadingAction();
    const handleError = useErrorHandler();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const team = await getTeam(teamID);
                setTeam(team);
            } catch (error) {
                handleError(error);
            }
            setLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamID]);

    return (
        <div>
            <MembersProvider teamID={teamID} loadOnMount>
                <h1>Team</h1>
                <div>{JSON.stringify(team)}</div>

                <TabBoard>
                    <div label='Members'>
                        <TeamMembers />
                    </div>
                    <div label='Settings'>
                        <div>Settings</div>
                    </div>
                </TabBoard>
            </MembersProvider>
        </div>
    );
};

export default TeamPage;
