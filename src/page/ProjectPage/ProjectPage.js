import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getProject } from '../../api/ProjectAPI';
import { getTasks } from '../../api/TaskAPI';
import { useLoadingAction } from '../../context/LoadingContext';

const ProjectPage = () => {
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState(null);

    const { teamID, projectID } = useParams();
    const history = useHistory();
    const setLoading = useLoadingAction();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const project = await getProject(teamID, projectID);
                const tasks = await getTasks(teamID, projectID);

                setProject(project);
                setTasks(tasks);
            } catch (error) {
                handleError(error.code);
                console.log(error);
            }
            setLoading(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teamID, projectID]);

    const handleError = (code) => {
        if (code === 403) {
            //TODO: handle unauthorized error: error.code = 403
            alert('Unauthorized');
        } else if (code === 422) {
            history.push('/not-found');
        }
    };

    return (
        <div>
            <h2>Project Page</h2>
            <div>{JSON.stringify(project)}</div>
            <div>{JSON.stringify(tasks)}</div>
        </div>
    );
};

export default ProjectPage;