import React, { useEffect, useState } from 'react';
import { getLogs } from '../../api/LogAPI';
import { completeTaskToggle, deleteTask } from '../../api/TaskAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';
import useUser from '../../context/UserContext';
import { addLog, uniqueLogs } from '../../utils/log';
import TaskTime from '../TaskTime';
import Assignee from './Assignee';
import Title from './Title';
import Description from './Description';
import Logs from './Logs';

const TaskInfo = ({ value }) => {
    const {
        taskID,
        title,
        description,
        assignee,
        totalTime,
        activeLog,
        isLogLoaded,
        completed,
        logs,
    } = value;

    const { tasksDispatch } = useTasks();
    const { user } = useUser();
    const setLoading = useLoadingAction();

    const [owned] = useState(assignee && assignee.userID === user.userID);

    useEffect(() => {
        if (!isLogLoaded) {
            (async () => {
                try {
                    const logs = await getLogs(value.taskID);

                    if (logs.length !== 0) {
                        value.started = true;
                    }
                    value.logs = uniqueLogs(value.logs || [], logs);
                    value.isLogLoaded = true;

                    tasksDispatch({
                        type: TASK_ACTIONS.UPDATE,
                        payload: value,
                    });
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [isLogLoaded, setLoading, tasksDispatch, value]);

    const updateTask = (task) => {
        value = { ...value, ...task };
        tasksDispatch({
            type: TASK_ACTIONS.UPDATE,
            payload: value,
        });
    };

    const handleDelete = async () => {
        try {
            await deleteTask(taskID);
            tasksDispatch({ type: TASK_ACTIONS.DELETE, payload: value });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCompleteToggle = async () => {
        try {
            const result = await completeTaskToggle(taskID, !completed);

            if (!completed) {
                const { totalTime, log } = result;
                value.activeLog = null;
                value.totalTime = totalTime;
                value.logs = addLog(logs, log);
            }

            value.completed = !completed;
            tasksDispatch({
                type: TASK_ACTIONS.UPDATE,
                payload: value,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ width: '50vw' }}>
            <div>
                <h2>Task</h2>
                <button onClick={handleDelete}>delete</button>
            </div>

            <Title id={taskID} value={title} onUpdate={updateTask} />

            <Assignee id={taskID} value={assignee} onUpdate={updateTask} />

            <Description
                id={taskID}
                value={description}
                onUpdate={updateTask}
            />

            <div>
                <div>Total Duration</div>
                <TaskTime total={totalTime} log={activeLog} />
            </div>

            <Logs value={logs} onUpdate={updateTask} owned={owned} />

            <div>
                {owned ? (
                    <button onClick={handleCompleteToggle}>
                        {completed ? 'Incomplete' : 'Completed'}
                    </button>
                ) : null}
            </div>
        </div>
    );
};
export default TaskInfo;
