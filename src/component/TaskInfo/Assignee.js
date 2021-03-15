import React from 'react';
import Select from 'react-select';
import { assignTask } from '../../api/TaskAPI';
import useMembers from '../../context/MembersContext';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import { createErrorToast } from '../../utils/toast';

const Assignee = ({ id, value, onUpdate }) => {
    const { members } = useMembers();
    const { toastDispatch } = useToast();

    const handleMemberChange = async ({ user }) => {
        try {
            await assignTask(id, user.userID);
            onUpdate({ assignee: user });
        } catch (error) {
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
        }
    };

    return (
        <div>
            <div>Team Member</div>
            <Select
                placeholder='Assigned To'
                isClearable={false}
                isSearchable={false}
                value={value ? { user: value } : null}
                options={members}
                getOptionLabel={({ user: { email } }) => email}
                getOptionValue={({ user: { userID } }) => userID}
                onChange={handleMemberChange}
            />
        </div>
    );
};

export default Assignee;
