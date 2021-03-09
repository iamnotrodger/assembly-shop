import React, { useEffect, useState } from 'react';
import { getLogs } from '../../api/LogAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';
import TaskTime from '../TaskTime';
import Select from 'react-select';
import useMembers from '../../context/MembersContext';
import { assignTask, completeTaskToggle, deleteTask } from '../../api/TaskAPI';
import useUser from '../../context/UserContext';
import LogList from './LogList';
import { addLog, uniqueLogs } from '../../utils/log';

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

                    if (logs.length !== 0) value.started = true;
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

    const onChangeMember = async ({ user }) => {
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

    const onDelete = async () => {
        try {
            await deleteTask(taskID);
            tasksDispatch({ type: TASK_ACTIONS.DELETE, payload: value });
        } catch (error) {
            console.log(error);
        }
    };

    const onCompleteToggle = async () => {
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

    const onDeleteLog = (logID, totalTime) => {
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
                <button onClick={onDelete}>delete</button>
            </div>
            <div>
                <div>Task Name</div>
                <h2>{title}</h2>
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
                    onChange={onChangeMember}
                />
            </div>

            <div>
                <div>Description</div>
                <p>{description}</p>
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
                        onDelete={onDeleteLog}
                        owned={owned}
                    />
                </div>
            </div>

            <div>
                {owned ? (
                    <button onClick={onCompleteToggle}>
                        {completed ? 'Incomplete' : 'Completed'}
                    </button>
                ) : null}
            </div>
        </div>
    );
};
export default TaskInfo;
