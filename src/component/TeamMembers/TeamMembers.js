import React from 'react';
import useMembers from '../../context/MembersContext';
import MemberSection from '../MemberSection';
import AddMember from './AddMember';

const TeamMembers = () => {
    const { userIsAdmin } = useMembers();

    return (
        <div>
            {userIsAdmin ? <AddMember /> : null}
            <MemberSection removable={userIsAdmin} />
        </div>
    );
};

export default TeamMembers;
