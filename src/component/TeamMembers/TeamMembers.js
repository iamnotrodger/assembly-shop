import React from 'react';
import useMembers from '../../context/MembersContext';
import MemberSection from '../MemberSection';
import AddMember from './AddMember';

import './TeamMembers.scss';

const TeamMembers = () => {
    const { userIsAdmin } = useMembers();

    return (
        <div className='team-members'>
            <AddMember disabled={!userIsAdmin} />
            <MemberSection removable={userIsAdmin} />
        </div>
    );
};

export default TeamMembers;
