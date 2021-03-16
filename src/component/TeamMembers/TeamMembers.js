import React from 'react';
import useMembers from '../../context/MembersContext';
import MemberSection from '../MemberSection';

const TeamMembers = () => {
    const { userIsAdmin } = useMembers();
    return (
        <div>
            <MemberSection removable={userIsAdmin} />
        </div>
    );
};

export default TeamMembers;
