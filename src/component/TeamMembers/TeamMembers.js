import React, { useEffect } from 'react';
import useMembers from '../../context/MembersContext';
import Member from '../Member';

const TeamMembers = ({ removable }) => {
    const { members, loadMembers, deleteMember } = useMembers();

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
            onDelete={removable ? () => handleDelete(member.userID) : null}
        />
    ));
};

export default TeamMembers;
