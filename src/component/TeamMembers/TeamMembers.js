import React, { useEffect } from 'react';
import useMembers from '../../context/MembersContext';
import useUser from '../../context/UserContext';
import Member from '../Member';

const TeamMembers = ({ removable }) => {
    const { members, loadMembers, deleteMember } = useMembers();
    const { user } = useUser();

    useEffect(() => {
        if (!members) loadMembers();
    }, [loadMembers, members]);

    const handleDelete = async (id) => {
        await deleteMember(id);
    };

    if (!members) return <div>what the freak</div>;

    return members.map((member) => (
        <Member
            key={member.userID}
            value={member}
            onDelete={
                removable && member.userID !== user.userID
                    ? () => handleDelete(member.userID)
                    : null
            }
        />
    ));
};

export default TeamMembers;
