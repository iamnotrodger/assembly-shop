import React, { useEffect } from 'react';
import useMembers from '../../context/MembersContext';
import { MEMBER_ACTIONS } from '../../context/MembersContext/utils';
import useUser from '../../context/UserContext';
import Member from '../Member';

const MemberSection = ({ removable }) => {
    const { members, asyncMemberDispatch } = useMembers();
    const { user } = useUser();

    useEffect(() => {
        if (!members) asyncMemberDispatch({ type: MEMBER_ACTIONS.LOAD });
    }, [asyncMemberDispatch, members]);

    const handleDelete = async (id) => {
        await asyncMemberDispatch({ type: MEMBER_ACTIONS.DELETE, payload: id });
    };

    if (!members) return <div>No Available Members</div>;

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

export default MemberSection;
