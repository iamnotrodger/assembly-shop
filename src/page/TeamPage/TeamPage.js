import React from 'react';
import { useParams } from 'react-router';
import TabBoard from '../../component/TabBoard';
import TeamHeader from '../../component/TeamHeader';
import TeamMembers from '../../component/TeamMembers';
import TeamSettings from '../../component/TeamSettings';
import { MembersProvider } from '../../context/MembersContext';

const TeamPage = () => {
    const { teamID } = useParams();
    return (
        <div>
            <MembersProvider teamID={teamID} loadOnMount>
                <TeamHeader teamID={teamID} />
                <TabBoard>
                    <div label='Members'>
                        <TeamMembers />
                    </div>
                    <div label='Settings'>
                        <TeamSettings teamID={teamID} />
                    </div>
                </TabBoard>
            </MembersProvider>
        </div>
    );
};

export default TeamPage;
