import React from 'react';
import { startTask, stopTask } from '../../api/TaskAPI';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';
import Assignee from './Assignee';
import LogButton from './LogButton';
import Timer from './Timer';

const Task = ({ value }) => {
    const { taskID, title, totalTime, assignee, activeLog } = value;

    const { tasksDispatch } = useTasks();

    const onStart = async () => {
        try {
            const startTime = await startTask(taskID);
            value.activeLog = { startTime };
            tasksDispatch({ type: TASK_ACTIONS.UPDATE, payload: value });
        } catch (error) {
            console.log(error);
        }
    };

    const onStop = async () => {
        try {
            value.totalTime = await stopTask(taskID);
            value.activeLog = null;
            tasksDispatch({ type: TASK_ACTIONS.UPDATE, payload: value });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ backgroundColor: 'red', margin: '5px' }}>
            <div>{title}</div>
            <Assignee value={assignee}>
                <LogButton
                    active={activeLog != null}
                    onStart={onStart}
                    onStop={onStop}
                />
            </Assignee>
            <div>
                <Timer total={totalTime} log={activeLog} />
            </div>
        </div>
    );
};

export default Task;
