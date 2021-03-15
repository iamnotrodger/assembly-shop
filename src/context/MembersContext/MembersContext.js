import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import {
    deleteTeamMember,
    getProjectMembers,
    getTeamMembers,
} from '../../api/MemberAPI';
import { createErrorToast } from '../../utils/toast';
import useToast, { TOAST_ACTIONS, TOAST_STATE } from '../ToastContext';
import useUser from '../UserContext';

const MembersContext = createContext();

export const MembersProvider = ({
    children,
    teamID,
    projectID,
    loadOnMount,
}) => {
    const [members, setMembers] = useState(null);
    const [userIsAdmin, setUserIsAdmin] = useState(false);

    const { user } = useUser();
    const { toastDispatch } = useToast();

    const loadMembers = useCallback(async () => {
        try {
            let members;

            if (teamID) {
                members = await getTeamMembers(teamID);
            } else {
                members = await getProjectMembers(projectID);
            }

            console.log('user: ', user);

            const index = members.findIndex(
                (member) => member.userID === user.userID,
            );

            // console.log('index: ', index);

            setUserIsAdmin(index > -1);
            setMembers(members);
        } catch (error) {
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamID, projectID, user.userID]);

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

    useEffect(() => {
        if (loadOnMount) loadMembers();
    }, [loadMembers, loadOnMount]);

    return (
        <MembersContext.Provider
            value={{ members, userIsAdmin, loadMembers, deleteMember }}>
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
