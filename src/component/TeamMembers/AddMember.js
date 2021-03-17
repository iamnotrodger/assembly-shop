import React, { useCallback, useEffect, useState } from 'react';
import useMembers, { MEMBER_ACTIONS } from '../../context/MembersContext';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import { createErrorToast } from '../../utils/toast';
import SearchSelect from '../SearchSelect';
import { getUsers } from '../../api/UserAPI';

const AddMember = () => {
    const [member, setMember] = useState(null);
    const [memberMap, setMemberMap] = useState({});

    const { members, asyncMemberDispatch } = useMembers();
    const { toastDispatch } = useToast();

    useEffect(() => {
        const map = members.reduce((map, member) => {
            map[member.userID] = { member };
            return map;
        }, {});
        setMemberMap(map);
    }, [members]);

    //** Filters the members that's already in the team */
    const searchAndFilterMembers = useCallback(
        async (input) => {
            const searched = await getUsers(input);
            return searched.filter((member) => !memberMap[member.userID]);
        },
        [memberMap],
    );

    const handleAddMember = async () => {
        try {
            await asyncMemberDispatch({
                type: MEMBER_ACTIONS.ADD,
                payload: member,
            });
            setMember(null);
        } catch (error) {
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
        }
    };

    return (
        <div>
            <SearchSelect
                search={searchAndFilterMembers}
                isClearable
                placeholder='Email'
                value={member}
                getOptionLabel={({ email }) => email}
                getOptionValue={({ userID }) => userID}
                onChange={setMember}
                closeMenuOnSelect={true}
            />
            <button onClick={handleAddMember} disabled={!member}>
                ADD
            </button>
        </div>
    );
};

export default AddMember;
