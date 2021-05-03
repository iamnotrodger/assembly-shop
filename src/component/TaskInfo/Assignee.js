import React from 'react';
import Select from 'react-select';
import { assignTask } from '../../api/TaskAPI';
import useMembers from '../../context/MembersContext';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import { createErrorToast } from '../../utils/toast';

const Assignee = ({ id, value, onUpdate, editable }) => {
    const { members } = useMembers();
    const { toastDispatch } = useToast();

    const handleMemberChange = async (member) => {
        try {
            if (value && value.userID === member.userID) return;

            await assignTask(id, member.memberID);
            onUpdate({ assignee: member });
        } catch (error) {
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
        }
    };

    return (
        <div className='form__group'>
            <label className='form__label'>
                Team Member
                <Select
                    isDisabled={!editable}
                    className='form__select'
                    classNamePrefix='form__select'
                    placeholder='Assign To'
                    isClearable={false}
                    value={value ? { user: value } : null}
                    options={members}
                    getOptionLabel={({ user: { email } }) => email}
                    getOptionValue={({ user: { userID } }) => userID}
                    onChange={handleMemberChange}
                />
            </label>
        </div>
    );
};

export default Assignee;
