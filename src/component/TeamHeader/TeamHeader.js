import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { getTeam, updateTeamName } from '../../api/TeamAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useMembers from '../../context/MembersContext';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import { createErrorToast } from '../../utils/toast';
import { validateTeamName } from '../../utils/validate';
import InputEditable from '../InputEditable';

const TeamHeader = ({ teamID }) => {
    const [teamName, setTeamName] = useState('');

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
            const { valid, error } = validateTeamName(input);
            if (!valid) throw new Error(error);

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
        <div>
            <h1>Team</h1>
            <div>
                <InputEditable
                    text={teamName}
                    editable={userIsAdmin}
                    onSave={handleSave}
                    hasButton>
                    <h1>{teamName}</h1>
                </InputEditable>
            </div>
        </div>
    );
};

export default TeamHeader;
