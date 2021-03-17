import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { quitTeam } from '../../api/MemberAPI';
import { deleteTeam } from '../../api/TeamAPI';
import useMembers from '../../context/MembersContext';
import useTeams, { TEAMS_ACTIONS } from '../../context/TeamsContext';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import { createErrorToast } from '../../utils/toast';
import AlertPanel from '../AlertPanel';

const TeamSettings = ({ teamID }) => {
    const [allowedToQuit, setAllowToQuit] = useState(false);
    const [isQuitPanelOpen, setIsQuitPanelOpen] = useState(false);
    const [isDeletePanelOpen, setIsDeletePanelOpen] = useState(false);

    const history = useHistory();
    const { members, userIsAdmin } = useMembers();
    const { teamsDispatch } = useTeams();
    const { toastDispatch } = useToast();

    useEffect(() => {
        if (userIsAdmin) {
            let numAdmins = 0;
            members.forEach((member) => {
                if (member.admin) numAdmins++;
            });
            setAllowToQuit(numAdmins > 1);
        } else {
            setAllowToQuit(true);
        }
    }, [members, userIsAdmin]);

    const handleSettingsAction = (action) => async () => {
        try {
            await action();
            removeTeamFromTeamContext(teamID);
            handleRedirect();
        } catch (error) {
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
        }
    };

    const handleRedirect = () => {
        history.push('/');
    };

    const removeTeamFromTeamContext = (teamID) => {
        teamsDispatch({ type: TEAMS_ACTIONS.DELETE, payload: teamID });
    };

    const handleQuitPanelToggle = () => {
        setIsQuitPanelOpen(!isQuitPanelOpen);
    };

    const handleDeletePanelToggle = () => {
        setIsDeletePanelOpen(!isDeletePanelOpen);
    };

    return (
        <div>
            <button disabled={!allowedToQuit} onClick={handleQuitPanelToggle}>
                QUIT TEAM
            </button>
            {userIsAdmin && !allowedToQuit ? (
                <p>
                    The Team requires at least one administrator. Either delete
                    the Team or promote a Team member to an administrator.
                </p>
            ) : null}
            <button disabled={!userIsAdmin} onClick={handleDeletePanelToggle}>
                DELETE TEAM
            </button>

            <AlertPanel
                isOpen={isQuitPanelOpen}
                title='Are you sure you want to quit the team?'
                onSubmit={handleSettingsAction(() => quitTeam(teamID))}
                onClose={handleQuitPanelToggle}
            />

            <AlertPanel
                isOpen={isDeletePanelOpen}
                message={
                    <>
                        <b>Warning: </b> deleting the team cannot be undone
                    </>
                }
                onSubmit={handleSettingsAction(() => deleteTeam(teamID))}
                onClose={handleDeletePanelToggle}
            />
        </div>
    );
};

export default TeamSettings;
