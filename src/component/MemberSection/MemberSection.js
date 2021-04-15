import React, { useEffect, useState } from 'react';
import useMembers, { MEMBER_ACTIONS } from '../../context/MembersContext';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import useUser from '../../context/UserContext';
import { createErrorToast } from '../../utils/toast';
import AlertPanel, { ALERT_TYPE } from '../AlertPanel';
import Member from '../Member';

const MemberSection = ({ removable }) => {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState(null);

    const { members, asyncMemberDispatch } = useMembers();
    const { user } = useUser();
    const { toastDispatch } = useToast();

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
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
        }
    };

    const handleAlertToggle = () => {
        setIsAlertOpen(!isAlertOpen);
    };

    if (!members) return <div>No Available Members</div>;

    return (
        <section>
            {members.map((member) => (
                <Member
                    key={member.userID}
                    value={member}
                    onDelete={
                        removable && member.userID !== user.userID
                            ? () => {
                                  setMemberToDelete(member);
                                  handleAlertToggle();
                              }
                            : null
                    }
                />
            ))}

            <AlertPanel
                type={ALERT_TYPE.CRITICAL}
                isOpen={isAlertOpen}
                title='Remove member?'
                message={memberToDelete && memberToDelete.user.email}
                submitText='Remove'
                onSubmit={() => {
                    if (!memberToDelete) return null;
                    handleDelete(memberToDelete.userID);
                    handleAlertToggle();
                }}
                onClose={() => {
                    handleAlertToggle();
                    setMemberToDelete(null);
                }}
            />
        </section>
    );
};

export default MemberSection;
