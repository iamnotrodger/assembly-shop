import React, { useEffect } from 'react';
import { getLogs } from '../../api/LogAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';
import TaskTime from '../TaskTime';
import Select from 'react-select';
import useMembers from '../../context/MembersContext';
import { assignTask, completeTaskToggle, deleteTask } from '../../api/TaskAPI';
import useUser from '../../context/UserContext';

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

    useEffect(() => {
        if (!isLogLoaded) {
            (async () => {
                try {
                    const logs = await getLogs(taskID);

                    value.logs = [...(value.logs || []), ...logs];
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
    }, [isLogLoaded, logs, setLoading, taskID, tasksDispatch, value]);

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
            await completeTaskToggle(taskID, !completed);

            value.completed = !completed;
            tasksDispatch({
                type: TASK_ACTIONS.UPDATE,
                payload: value,
            });
        } catch (error) {
            console.log(error);
        }
    };

    //TODO: be able to update title + description
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
                <div>{JSON.stringify(value.logs)}</div>
            </div>

            <div>
                {assignee && assignee.userID === user.userID ? (
                    <button onClick={onCompleteToggle}>
                        {completed ? 'Incomplete' : 'Completed'}
                    </button>
                ) : null}
            </div>
        </div>
    );
};
export default TaskInfo;
