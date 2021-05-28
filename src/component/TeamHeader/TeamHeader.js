import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { getTeam, updateTeamName } from '../../api/TeamAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useMembers from '../../context/MembersContext';
import useTeams, {
    TEAMS_ACTIONS,
    USER_TEAMS_ACTIONS,
    useUsersTeams,
} from '../../context/TeamsContext';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import { createErrorToast } from '../../utils/toast';
import { TeamNameSchema } from '../../utils/validate';
import InputEditable from '../InputEditable';
import './TeamHeader.scss';

const TeamHeader = ({ teamID }) => {
    const [teamName, setTeamName] = useState('');
    const scheme = teamID % 5;

    const { userIsAdmin } = useMembers();
    const { teamsDispatch } = useTeams();
    const { userTeamsDispatch } = useUsersTeams();
    const setLoading = useLoadingAction();
    const handleError = useErrorHandler();
    const { toastDispatch } = useToast();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { name } = await getTeam(teamID);
                setTeamName(name);
            } catch (error) {
                handleError(error);
            }
            setLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamID]);

    const handleSave = async (name) => {
        try {
            await TeamNameSchema.validate(name);
            await updateTeamName(name, teamID);
            setTeamName(name);
            updateTeamsContext({ teamID, name });
        } catch (error) {
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
        }
    };

    const updateTeamsContext = (team) => {
        teamsDispatch({
            type: TEAMS_ACTIONS.UPDATE_NAME,
            payload: team,
        });
        userTeamsDispatch({
            type: USER_TEAMS_ACTIONS.UPDATE_NAME,
            payload: team,
        });
    };

    return (
        <div className={`team-header team-header--${scheme}`}>
            <h2 className='heading-secondary team-header__title'>Team</h2>
            <InputEditable
                text={teamName}
                className={`team-header__input team-header--${scheme}`}
                editable={userIsAdmin}
                onSave={handleSave}
                hasButton={false}
                dynamic={true}>
                <h1 className={`team-header__team-name team-header--${scheme}`}>
                    {teamName}
                </h1>
            </InputEditable>
        </div>
    );
};

export default TeamHeader;
