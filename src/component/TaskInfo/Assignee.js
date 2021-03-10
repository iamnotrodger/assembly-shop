import React from 'react';
import Select from 'react-select';
import { assignTask } from '../../api/TaskAPI';
import useMembers from '../../context/MembersContext';

const Assignee = ({ id, value, onUpdate }) => {
    const members = useMembers();

    const handleMemberChange = async ({ user }) => {
        try {
            await assignTask(id, user.userID);
            onUpdate({ assignee: user });
        } catch (error) {
            console.log(error);
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
