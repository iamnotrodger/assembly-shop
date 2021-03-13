import React, { createContext, useCallback, useContext, useState } from 'react';
import {
    deleteTeamMember,
    getProjectMembers,
    getTeamMembers,
} from '../../api/MemberAPI';
import { createErrorToast } from '../../utils/toast';
import useToast, { TOAST_ACTIONS, TOAST_STATE } from '../ToastContext';

const MembersContext = createContext();

export const MembersProvider = ({ children, teamID, projectID }) => {
    const [members, setMembers] = useState(null);

    const { toastDispatch } = useToast();

    const loadMembers = useCallback(async () => {
        try {
            let members;

            if (teamID) {
                members = await getTeamMembers(teamID);
            } else {
                members = await getProjectMembers(projectID);
            }

            setMembers(members);
        } catch (error) {
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
        }
    }, [teamID, projectID, toastDispatch]);

    const deleteMember = useCallback(
        async (userID) => {
            try {
                if (teamID) {
                    await deleteTeamMember(userID, teamID);
                }
                const index = members.findIndex(
                    (member) => member.userID === userID,
                );

                const newMembers = [...members];
                newMembers.splice(index, 1);
                setMembers(newMembers);

                toastDispatch({
                    type: TOAST_ACTIONS.ADD,
                    payload: {
                        state: TOAST_STATE.SUCCESS,
                        title: 'Member Removed',
                    },
                });
            } catch (error) {
                toastDispatch({
                    type: TOAST_ACTIONS.ADD,
                    payload: createErrorToast(error.message),
                });
            }
        },
        [members, teamID, toastDispatch],
    );

    return (
        <MembersContext.Provider value={{ members, loadMembers, deleteMember }}>
            {children}
        </MembersContext.Provider>
    );
};

const useMembers = () => {
    const context = useContext(MembersContext);
    if (context === undefined) {
        throw new Error('useMembers must be used within a MembersContext');
    }

    return context;
};

export default useMembers;
