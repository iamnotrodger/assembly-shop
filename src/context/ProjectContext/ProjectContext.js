import React, { createContext, useContext, useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { getProject } from '../../api/ProjectAPI';
import { useLoadingAction } from '../LoadingContext';

const ProjectContext = createContext();

export const ProjectProvider = ({ projectID, children }) => {
    const [project, setProject] = useState({
        projectID,
        name: '',
    });
    const [team, setTeam] = useState({ name: '' });

    const handleError = useErrorHandler();
    const setLoading = useLoadingAction();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { team, ...project } = await getProject(projectID);
                setProject(project);
                setTeam(team);
            } catch (error) {
                handleError(error);
            }
            setLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectID]);

    return (
        <ProjectContext.Provider value={{ project, team, setProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

const useProject = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProject must be used within a MembersContext');
    }

    return context;
};

export default useProject;
