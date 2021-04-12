import React, { useState } from 'react';
import { startTask, stopTask } from '../../api/TaskAPI';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';
import { addLog } from '../../utils/log';
import Modal from '../Modal';
import TaskInfo from '../TaskInfo/TaskInfo';
import TaskTime from '../TaskTime';
import Assignee from './Assignee';
import LogButton from './LogButton';

import './Task.scss';

const Task = ({ value }) => {
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const { taskID, title, totalTime, assignee, activeLog, completed } = value;

    const { tasksDispatch } = useTasks();

    const onStart = async () => {
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

    const onStop = async () => {
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

    const handleInfoToggle = () => {
        setIsInfoOpen(!isInfoOpen);
    };

    return (
        <div className='task'>
            <h3
                className='heading-tertiary task__title'
                onClick={handleInfoToggle}>
                {title}
            </h3>

            <Assignee value={assignee}>
                {!completed ? (
                    <LogButton
                        active={activeLog != null}
                        onStart={onStart}
                        onStop={onStop}
                    />
                ) : (
                    <i className='material-icons md-36 md-circle'>check</i>
                )}
            </Assignee>

            <TaskTime
                onClick={handleInfoToggle}
                className='task__time'
                total={totalTime}
                log={activeLog}
            />

            <Modal isOpen={isInfoOpen} onClose={handleInfoToggle}>
                <TaskInfo value={value} />
            </Modal>
        </div>
    );
};

export default Task;
