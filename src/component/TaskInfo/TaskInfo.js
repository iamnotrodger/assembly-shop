import React, { useEffect, useState } from 'react';
import { getLogs } from '../../api/LogAPI';
import { completeTaskToggle, deleteTask } from '../../api/TaskAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';
import useToast, {
    TOAST_ACTIONS,
    TOAST_STATE,
} from '../../context/ToastContext';
import useUser from '../../context/UserContext';
import { addLog, uniqueLogs } from '../../utils/log';
import { createErrorToast } from '../../utils/toast';
import AlertPanel from '../AlertPanel';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import Assignee from './Assignee';
import Description from './Description';
import Logs from './Logs';
import Title from './Title';
import TotalTime from './TotalTime';

import './TaskInfo.scss';

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

    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const { tasksDispatch } = useTasks();
    const { user } = useUser();
    const setLoading = useLoadingAction();
    const { toastDispatch } = useToast();

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
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
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

            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: {
                    state: TOAST_STATE.SUCCESS,
                    title: `Task ${!completed ? 'Complete' : 'Incomplete'}`,
                },
            });
            tasksDispatch({
                type: TASK_ACTIONS.UPDATE,
                payload: value,
            });
        } catch (error) {
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
        }
    };

    const handleAlertToggle = async () => {
        setIsAlertOpen(!isAlertOpen);
    };

    return (
        <div className='form'>
            <div className='task-info__title-container'>
                <h2 className='form__title heading-secondary'>Task</h2>
                <Menu
                    className='more-menu'
                    header={<i className='material-icons md-36'>more_vert</i>}>
                    <MenuItem
                        className='more-menu__item'
                        onClick={handleAlertToggle}>
                        <div>Delete</div>
                    </MenuItem>
                </Menu>
            </div>

            <Title id={taskID} value={title} onUpdate={updateTask} />
            <Description
                id={taskID}
                value={description}
                onUpdate={updateTask}
            />
            <Assignee id={taskID} value={assignee} onUpdate={updateTask} />
            <TotalTime value={totalTime} log={activeLog} />
            <Logs value={logs} onUpdate={updateTask} owned={owned} />

            {owned ? (
                <button
                    className='form__submit btn'
                    onClick={handleCompleteToggle}>
                    {completed ? 'Incomplete' : 'Complete'}
                </button>
            ) : null}

            <AlertPanel
                isOpen={isAlertOpen}
                message='Deleting the task cannot be undone'
                onSubmit={handleDelete}
                onClose={handleAlertToggle}
            />
        </div>
    );
};
export default TaskInfo;
