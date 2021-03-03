import React, { useEffect, useState } from 'react';
import { useLoadingAction } from '../../context/LoadingContext';
import { getTasks } from '../../api/TaskAPI';

const TaskBoard = ({ teamID, projectID }) => {
    const [todoTasks, setTodoTasks] = useState([]);
    const [doingTasks, setDoingTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);

    const setLoading = useLoadingAction();

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const tasks = await getTasks(teamID, projectID);
                filterTask(tasks);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, [teamID, projectID, setLoading]);

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

    return (
        <div>
            <div>
                TODO
                <div>{JSON.stringify(todoTasks)}</div>
            </div>
            <div>
                DOING
                <div>{JSON.stringify(doingTasks)}</div>
            </div>
            <div>
                DONE
                <div>{JSON.stringify(doneTasks)}</div>
            </div>
        </div>
    );
};

export default TaskBoard;
