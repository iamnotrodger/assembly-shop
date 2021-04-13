import React from 'react';
import { updateProjectName } from '../../api/ProjectAPI';
import useToast, { TOAST_ACTIONS } from '../../context/ToastContext';
import { createErrorToast } from '../../utils/toast';
import { validateProjectName } from '../../utils/validate';
import InputEditable from '../InputEditable';

const ProjectName = ({ name, projectID, onSave, children, ...props }) => {
    const { toastDispatch } = useToast();

    const handleSave = async (name) => {
        try {
            const error = validateProjectName(name);
            if (error) throw new Error(error);

            await updateProjectName(projectID, name);
            onSave(name);
        } catch (error) {
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
        }
    };

    return (
        <>
            <InputEditable text={name} onSave={handleSave} {...props}>
                {children}
            </InputEditable>
        </>
    );
};

export default ProjectName;
