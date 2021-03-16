import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useReducer,
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
import { MEMBER_ACTIONS, reducer } from './utils';

const MembersContext = createContext();

export const MembersProvider = ({
    children,
    teamID,
    projectID,
    loadOnMount,
}) => {
    const [members, memberDispatch] = useReducer(reducer, null);
    const [userIsAdmin, setUserIsAdmin] = useState(false);

    const { user } = useUser();
    const { toastDispatch } = useToast();

    const asyncMemberDispatch = useCallback(
        async (action) => {
            try {
                switch (action.type) {
                    case MEMBER_ACTIONS.ADD:
                        if (projectID) break;
                        break;
                    case MEMBER_ACTIONS.LOAD:
                        let members;
                        if (teamID) members = await getTeamMembers(teamID);
                        else members = await getProjectMembers(projectID);

                        action.payload = members;
                        memberDispatch(action);
                        break;
                    case MEMBER_ACTIONS.DELETE:
                        if (projectID) break;
                        await deleteTeamMember(action.payload, teamID);
                        memberDispatch(action);
                        toastDispatch({
                            type: TOAST_ACTIONS.ADD,
                            payload: {
                                state: TOAST_STATE.SUCCESS,
                                title: 'Member Removed',
                            },
                        });
                        break;
                    default:
                        memberDispatch(action);
                }
            } catch (error) {
                toastDispatch({
                    type: TOAST_ACTIONS.ADD,
                    payload: createErrorToast(error.message),
                });
            }
        },
        [projectID, teamID, toastDispatch],
    );

    useEffect(() => {
        if (loadOnMount) asyncMemberDispatch({ type: MEMBER_ACTIONS.LOAD });
    }, [asyncMemberDispatch, loadOnMount]);

    useEffect(() => {
        if (members) {
            const index = members.findIndex(
                (member) => member.userID === user.userID,
            );
            setUserIsAdmin(index > -1);
        }
    }, [members, user.userID]);

    return (
        <MembersContext.Provider
            value={{ members, userIsAdmin, asyncMemberDispatch }}>
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
