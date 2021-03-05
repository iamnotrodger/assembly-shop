import React from 'react';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';

const Task = ({ value }) => {
    const { title, totalTime, assignee, activeLog } = value;

    const { tasksDispatch } = useTasks();

    const handleStart = () => {
        tasksDispatch({ type: TASK_ACTIONS.UPDATE, payload: value });
    };

    const handleStop = () => {
        tasksDispatch({ type: TASK_ACTIONS.UPDATE, payload: value });
    };

    return (
        <div style={{ backgroundColor: 'red', margin: '5px' }}>
            <div>{title}</div>
            {assignee ? <div>{assignee.name}</div> : null}
            {activeLog ? (
                <button onClick={handleStop}>pause</button>
            ) : (
                <button onClick={handleStart}>play</button>
            )}
            {totalTime > 0 ? <div>{totalTime}</div> : null}
        </div>
    );
};

export default Task;
