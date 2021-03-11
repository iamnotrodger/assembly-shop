import React from 'react';
import { updateProjectName } from '../../api/ProjectAPI';
import { validateProjectName } from '../CreateProject/utils';
import InputEditable from '../InputEditable/InputEditable';

const ProjectName = ({
    name,
    projectID,
    teamID,
    editable,
    onSave,
    hasButton,
    children,
}) => {
    const handleSave = async (name) => {
        try {
            const { valid } = validateProjectName(name);
            if (!valid) return;

            await updateProjectName(teamID, projectID, name);
            onSave(name);
        } catch (error) {}
    };

    return (
        <>
            <InputEditable
                text={name}
                onSave={handleSave}
                editable={editable}
                hasButton={hasButton}>
                {children}
            </InputEditable>
        </>
    );
};

export default ProjectName;
