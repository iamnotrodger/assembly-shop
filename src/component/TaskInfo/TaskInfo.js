import React, { useEffect, useState } from 'react';
import { getLogs } from '../../api/LogAPI';
import { completeTaskToggle, deleteTask } from '../../api/TaskAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useMembers from '../../context/MembersContext';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';
import useToast, {
    TOAST_ACTIONS,
    TOAST_STATE,
} from '../../context/ToastContext';
import useUser from '../../context/UserContext';
import { addLog, uniqueLogs } from '../../utils/log';
import { createErrorToast } from '../../utils/toast';
import AlertPanel, { ALERT_TYPE } from '../AlertPanel';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import Assignee from './Assignee';
import Description from './Description';
import Logs from './Logs';
import Title from './Title';
import TotalTime from './TotalTime';

import './TaskInfo.scss';

const TaskInfo = ({ value, onClose }) => {
    const [task, setTask] = useState(value);
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
    } = task;

    const [isAlertOpen, setIsAlertOpen] = useState(false);

    const { tasksDispatch } = useTasks();
    const { user } = useUser();
    const { userIsAdmin } = useMembers();
    const setLoading = useLoadingAction();
    const { toastDispatch } = useToast();

    const [isTaskOwner, setIsTaskOwner] = useState(false);
    const [hasEditPermission, setHasEditPermission] = useState(
        userIsAdmin || (assignee && assignee.userID === user.userID),
    );

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

    useEffect(() => {
        const ownsTask = assignee && assignee.userID === user.userID;
        setIsTaskOwner(ownsTask);
        setHasEditPermission(ownsTask || userIsAdmin);
    }, [assignee, user, userIsAdmin]);

    const updateTask = (newTask) => {
        const value = { ...task, ...newTask };
        setTask(value);
        tasksDispatch({
            type: TASK_ACTIONS.UPDATE,
            payload: value,
        });
    };

    const handleDelete = async () => {
        try {
            await deleteTask(taskID);
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: {
                    state: TOAST_STATE.SUCCESS,
                    title: 'Task Deleted',
                },
            });
            tasksDispatch({ type: TASK_ACTIONS.DELETE, payload: task });
            onClose();
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
                task.activeLog = null;
                task.totalTime = totalTime;
                task.logs = addLog(logs, log);
            }

            task.completed = !completed;

            updateTask(task);

            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: {
                    state: TOAST_STATE.SUCCESS,
                    title: `Task ${!completed ? 'Complete' : 'Incomplete'}`,
                },
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
                    header={
                        <i className='material-icons md-36 animate-hover-white'>
                            more_vert
                        </i>
                    }>
                    <MenuItem
                        className={`more-menu__item ${
                            !hasEditPermission
                                ? 'more-menu__item--disabled'
                                : ''
                        }`}
                        onClick={hasEditPermission ? handleAlertToggle : null}>
                        <div>Delete</div>
                    </MenuItem>
                </Menu>
            </div>

            <Title
                id={taskID}
                value={title}
                onUpdate={updateTask}
                editable={hasEditPermission}
            />
            <Description
                id={taskID}
                value={description}
                onUpdate={updateTask}
                editable={hasEditPermission}
            />
            <Assignee
                id={taskID}
                value={assignee}
                onUpdate={updateTask}
                editable={hasEditPermission}
            />
            <TotalTime value={totalTime} log={activeLog} />
            <Logs value={logs} onUpdate={updateTask} editable={isTaskOwner} />

            {hasEditPermission ? (
                <button
                    className='form__submit btn'
                    onClick={handleCompleteToggle}>
                    {completed ? 'Incomplete' : 'Complete'}
                </button>
            ) : null}

            <AlertPanel
                type={ALERT_TYPE.CRITICAL}
                isOpen={isAlertOpen}
                title='Delete the task?'
                submitText='Delete'
                onSubmit={handleDelete}
                onClose={handleAlertToggle}
            />
        </div>
    );
};
export default TaskInfo;
