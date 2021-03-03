import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { getProject } from '../../api/ProjectAPI';
import { useLoadingAction } from '../../context/LoadingContext';

const ProjectHeader = ({ teamID, projectID }) => {
    const [project, setProject] = useState({ team: {} });
    const { name, team } = project;

    const handleError = useErrorHandler();
    const setLoading = useLoadingAction();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const project = await getProject(teamID, projectID);
                setProject(project);
            } catch (error) {
                handleError(error);
            }
            setLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamID, projectID]);

    return (
        <div
            style={{
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-evenly',
            }}>
            <h3>{name}</h3>
            <h3>{team.name}</h3>
            <h3>settings</h3>
        </div>
    );
};

export default ProjectHeader;
