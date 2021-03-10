import React, { useEffect, useState } from 'react';
import { getLogs } from '../../api/LogAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';
import TaskTime from '../TaskTime';
import Select from 'react-select';
import useMembers from '../../context/MembersContext';
import {
    assignTask,
    completeTaskToggle,
    deleteTask,
    updateTask,
} from '../../api/TaskAPI';
import useUser from '../../context/UserContext';
import LogList from './LogList';
import { addLog, uniqueLogs } from '../../utils/log';
import InputEditable from '../InputEditable/InputEditable';

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
    const members = useMembers();
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

    const handleTitleSave = async (title) => {
        try {
            if (!title) return;

            await updateTask(taskID, title, 'title');
            value.title = title;

            tasksDispatch({
                type: TASK_ACTIONS.UPDATE,
                payload: value,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDescriptionSave = async (description) => {
        try {
            await updateTask(taskID, description, 'description');
            value.description = description;
            tasksDispatch({
                type: TASK_ACTIONS.UPDATE,
                payload: value,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleMemberChange = async ({ user }) => {
        setLoading(true);
        try {
            await assignTask(taskID, user.userID);

            value.assignee = user;
            tasksDispatch({
                type: TASK_ACTIONS.UPDATE,
                payload: value,
            });
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
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

    const handleDeleteLog = (logID, totalTime) => {
        if (totalTime != null) {
            value.totalTime = totalTime;
        }

        value.logs = logs.filter((log) => log.logID !== logID);

        console.log(value);

        tasksDispatch({
            type: TASK_ACTIONS.UPDATE,
            payload: value,
        });
    };

    return (
        <div style={{ width: '50vw' }}>
            <div>
                <h2>Task</h2>
                <button onClick={handleDelete}>delete</button>
            </div>
            <div>
                <label>
                    Task Title
                    <InputEditable
                        text={title}
                        type='text'
                        onSave={handleTitleSave}>
                        <h2>{title}</h2>
                    </InputEditable>
                </label>
            </div>

            <div>
                <div>Team Member</div>
                <Select
                    placeholder='Assigned To'
                    isClearable={false}
                    isSearchable={false}
                    value={assignee ? { user: assignee } : null}
                    options={members}
                    getOptionLabel={({ user: { email } }) => email}
                    getOptionValue={({ user: { userID } }) => userID}
                    onChange={handleMemberChange}
                />
            </div>

            <div>
                <label>
                    Task Description
                    <InputEditable
                        text={description}
                        type='text'
                        onSave={handleDescriptionSave}
                        hasButton>
                        <p>{description || 'Description'}</p>
                    </InputEditable>
                </label>
            </div>

            <div>
                <div>Total Duration</div>
                <TaskTime total={totalTime} log={activeLog} />
            </div>

            <div>
                <h3>Logs</h3>
                <div>
                    <LogList
                        value={logs}
                        onDelete={handleDeleteLog}
                        owned={owned}
                    />
                </div>
            </div>

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
