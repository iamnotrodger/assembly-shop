import React from 'react';
import { startTask, stopTask } from '../../api/TaskAPI';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';
import { addLog } from '../../utils/log';
import TaskTime from '../TaskTime';
import Assignee from './Assignee';
import LogButton from './LogButton';

import './Task.scss';

const Task = ({ value, onClick }) => {
    const { taskID, title, totalTime, assignee, activeLog, completed } = value;

    const { tasksDispatch } = useTasks();

    const onStart = async (event) => {
        event.stopPropagation();
        try {
            const { log } = await startTask(taskID);

            value.activeLog = log;
            value.logs = addLog(value.logs || [], log);
            value.started = true;

            tasksDispatch({ type: TASK_ACTIONS.UPDATE, payload: value });
        } catch (error) {
            console.log(error);
        }
    };

    const onStop = async (event) => {
        event.stopPropagation();
        try {
            const { totalTime, log } = await stopTask(taskID);

            value.totalTime = totalTime;
            value.activeLog = null;
            value.logs = addLog(value.logs || [], log);

            tasksDispatch({ type: TASK_ACTIONS.UPDATE, payload: value });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='task' onClick={onClick || null}>
            <div className='task__title-container'>
                <h3 className='heading-tertiary task__title'>{title}</h3>
            </div>

            <Assignee value={assignee && assignee.user}>
                <LogButton
                    active={activeLog != null}
                    onStart={onStart}
                    onStop={onStop}
                    completed={completed}
                />
            </Assignee>

            <TaskTime
                className='task__time'
                total={totalTime}
                log={activeLog}
            />
        </div>
    );
};

export default Task;
