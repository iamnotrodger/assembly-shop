import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { getTeam, updateTeamName } from '../../api/TeamAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useMembers from '../../context/MembersContext';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import { createErrorToast } from '../../utils/toast';
import { validateTeamName } from '../../utils/validate';
import InputEditable from '../InputEditable';

import './TeamHeader.scss';

const TeamHeader = ({ teamID }) => {
    const [teamName, setTeamName] = useState('');
    const scheme = teamID % 5;

    const { userIsAdmin } = useMembers();
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

    const handleSave = async (input) => {
        try {
            const error = validateTeamName(input);
            if (error) throw new Error(error);

            await updateTeamName(input, teamID);
            setTeamName(input);
        } catch (error) {
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
        }
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
                <div className='team-header__team-name-container'>
                    <h1
                        className={`team-header__team-name team-header--${scheme}`}>
                        {teamName}
                    </h1>
                </div>
            </InputEditable>
        </div>
    );
};

export default TeamHeader;
