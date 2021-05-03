import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState,
} from 'react';
import {
    addTeamMember,
    deleteTeamMember,
    getProjectMembers,
    getTeamMembers,
} from '../../api/MemberAPI';
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

    const asyncMemberDispatch = useCallback(
        async (action) => {
            switch (action.type) {
                case MEMBER_ACTIONS.ADD:
                    if (projectID) break;

                    const user = action.payload;
                    const member = await addTeamMember(user.userID, teamID);

                    action.payload = { ...member, user };
                    memberDispatch(action);
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
                    break;
                default:
                    memberDispatch(action);
            }
        },
        [projectID, teamID],
    );

    useEffect(() => {
        if (loadOnMount) asyncMemberDispatch({ type: MEMBER_ACTIONS.LOAD });
    }, [asyncMemberDispatch, loadOnMount]);

    useEffect(() => {
        if (members && user) {
            const index = members.findIndex(
                (member) => member.userID === user.userID && member.admin,
            );
            setUserIsAdmin(index > -1);
        }
    }, [members, user]);

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
