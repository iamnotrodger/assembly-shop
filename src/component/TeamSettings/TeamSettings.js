import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { quitTeam } from '../../api/MemberAPI';
import { deleteTeam } from '../../api/TeamAPI';
import useMembers from '../../context/MembersContext';
import useTeams, {
    TEAMS_ACTIONS,
    USER_TEAMS_ACTIONS,
    useUsersTeams,
} from '../../context/TeamsContext';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import { createErrorToast } from '../../utils/toast';
import AlertPanel, { ALERT_TYPE } from '../AlertPanel';

import './TeamSettings.scss';

const TeamSettings = ({ teamID }) => {
    const [allowedToQuit, setAllowToQuit] = useState(false);
    const [isQuitPanelOpen, setIsQuitPanelOpen] = useState(false);
    const [isDeletePanelOpen, setIsDeletePanelOpen] = useState(false);

    const history = useHistory();
    const { members, userIsAdmin } = useMembers();
    const { teamsDispatch } = useTeams();
    const { userTeamsDispatch } = useUsersTeams();
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
        userTeamsDispatch({
            type: USER_TEAMS_ACTIONS.DELETE,
            payload: teamID,
        });
    };

    const handleQuitPanelToggle = () => {
        setIsQuitPanelOpen(!isQuitPanelOpen);
    };

    const handleDeletePanelToggle = () => {
        setIsDeletePanelOpen(!isDeletePanelOpen);
    };

    return (
        <section className='team-settings'>
            <button
                className='btn team-settings__button team-settings__button--quit'
                disabled={!allowedToQuit}
                onClick={handleQuitPanelToggle}>
                quit team
            </button>

            {userIsAdmin && !allowedToQuit ? (
                <p className='team-settings__paragraph'>
                    The Team requires at least one administrator. Either delete
                    the Team or promote a Team member to an administrator.
                </p>
            ) : null}

            <button
                disabled={!userIsAdmin}
                className='btn btn--critical team-settings__button team-settings__button--delete'
                onClick={handleDeletePanelToggle}>
                delete team
            </button>

            <AlertPanel
                type={ALERT_TYPE.CRITICAL}
                isOpen={isQuitPanelOpen}
                title='Quit Team?'
                onSubmit={handleSettingsAction(() => quitTeam(teamID))}
                onClose={handleQuitPanelToggle}
            />

            <AlertPanel
                type={ALERT_TYPE.CRITICAL}
                isOpen={isDeletePanelOpen}
                title='Permanently delete Team?'
                submitText='Delete'
                onSubmit={handleSettingsAction(() => deleteTeam(teamID))}
                onClose={handleDeletePanelToggle}
            />
        </section>
    );
};

export default TeamSettings;
