import React, { useEffect } from 'react';
import useMembers, { MEMBER_ACTIONS } from '../../context/MembersContext';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import useUser from '../../context/UserContext';
import { createErrorToast } from '../../utils/toast';
import Member from '../Member';

const MemberSection = ({ removable }) => {
    const { members, asyncMemberDispatch } = useMembers();
    const { user } = useUser();
    const { tokenDispatch } = useToast();

    useEffect(() => {
        if (!members) asyncMemberDispatch({ type: MEMBER_ACTIONS.LOAD });
    }, [asyncMemberDispatch, members]);

    const handleDelete = async (id) => {
        try {
            await asyncMemberDispatch({
                type: MEMBER_ACTIONS.DELETE,
                payload: id,
            });
        } catch (error) {
            tokenDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
        }
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
