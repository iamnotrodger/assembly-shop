import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router';
import { getTeam } from '../../api/TeamAPI';
import TabBoard from '../../component/TabBoard';
import { useLoadingAction } from '../../context/LoadingContext';

//TODO: create panel/tab component
//TODO: determined if the user is the admin or not

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
            <h1>Team</h1>
            <div>{JSON.stringify(team)}</div>

            <div>
                <TabBoard>
                    <div label='Members'>
                        <div>Members</div>
                    </div>
                    <div label='Settings'>
                        <div>Settings</div>
                    </div>
                </TabBoard>
            </div>
        </div>
    );
};

export default TeamPage;
