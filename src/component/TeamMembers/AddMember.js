import React, { useCallback, useEffect, useState } from 'react';
import useMembers, { MEMBER_ACTIONS } from '../../context/MembersContext';
import useToast, {
    TOAST_ACTIONS,
    TOAST_STATE,
} from '../../context/ToastContext';
import { createErrorToast } from '../../utils/toast';
import SearchSelect from '../SearchSelect';
import { getUsers } from '../../api/UserAPI';

const AddMember = ({ disabled }) => {
    const [member, setMember] = useState(null);
    const [memberMap, setMemberMap] = useState({});

    const { members, asyncMemberDispatch } = useMembers();
    const { toastDispatch } = useToast();

    useEffect(() => {
        if (members) {
            const map = members.reduce((map, member) => {
                map[member.userID] = { member };
                return map;
            }, {});
            setMemberMap(map);
        }
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
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: {
                    state: TOAST_STATE.SUCCESS,
                    title: 'Member added',
                },
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
        <div className='add-member'>
            <h3 className='heading-tertiary add-member__title'>
                Invite Members!
            </h3>
            <div className='add-member__content'>
                <SearchSelect
                    search={searchAndFilterMembers}
                    className='form__select add-member__search'
                    classNamePrefix='form__select'
                    isDisabled={disabled}
                    isClearable
                    placeholder='Email'
                    value={member}
                    getOptionLabel={({ email }) => email}
                    getOptionValue={({ userID }) => userID}
                    onChange={setMember}
                    closeMenuOnSelect={true}
                />
                <button
                    className='btn--success add-member__button'
                    onClick={handleAddMember}
                    disabled={disabled || !member}>
                    <i className='material-icons md-36 add-team__button-icon'>
                        person_add
                    </i>
                </button>
            </div>
        </div>
    );
};

export default AddMember;
