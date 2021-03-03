import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../../api/ProjectAPI';
import { getTasks } from '../../api/TaskAPI';
import TaskBoard from '../../component/TaskBoard/TaskBoard';
import { useLoadingAction } from '../../context/LoadingContext';
import { MembersProvider } from '../../context/MembersContext/MembersContext';
import useError from '../../hook/useError';

const ProjectPage = () => {
    const [project, setProject] = useState(null);
    const [todoTasks, setTodoTasks] = useState([]);
    const [doingTasks, setDoingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    const { teamID, projectID } = useParams();
    const setLoading = useLoadingAction();
    const throwError = useError();

    const filterTask = (tasks) => {
        const todoTasks = [];
        const doingTasks = [];
        const doneTasks = [];

        tasks.forEach((task) => {
            const { completed, activeLog, totalTime } = task;
            if (completed) {
                doneTasks.push(task);
            } else if (activeLog || totalTime > 0) {
                doingTasks.push(task);
            } else {
                todoTasks.push(task);
            }
        });

        setTodoTasks(todoTasks);
        setDoingTasks(doingTasks);
        setDoneTasks(doneTasks);
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const project = await getProject(teamID, projectID);
                const tasks = await getTasks(teamID, projectID);

                setProject(project);
                filterTask(tasks);
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
            <MembersProvider teamID={teamID}>
                <TaskBoard title='Todo' value={todoTasks} />
                <TaskBoard title='Doing' value={doingTasks} />
                <TaskBoard title='Done' value={doneTasks} />
            </MembersProvider>
        </div>
    );
};

export default ProjectPage;
