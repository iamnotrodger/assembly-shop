import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../../api/ProjectAPI';
import { getTasks } from '../../api/TaskAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useError from '../../hook/useError';

const ProjectPage = () => {
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState(null);

    const { teamID, projectID } = useParams();
    const setLoading = useLoadingAction();
    const throwError = useError();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const project = await getProject(teamID, projectID);
                const tasks = await getTasks(teamID, projectID);

                setProject(project);
                setTasks(tasks);
            } catch (error) {
                throwError(error);
            }
            setLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamID, projectID]);

    return (
        <div>
            <h2>Project Page</h2>
            <div>{JSON.stringify(project)}</div>
            <div>{JSON.stringify(tasks)}</div>
        </div>
    );
};

export default ProjectPage;
