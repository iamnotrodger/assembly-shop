import React, { useState } from 'react';
import { startTask, stopTask } from '../../api/TaskAPI';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';
import Modal from '../Modal';
import TaskInfo from '../TaskInfo/TaskInfo';
import TaskTime from '../TaskTime';
import Assignee from './Assignee';
import LogButton from './LogButton';

const Task = ({ value }) => {
    const [isInfoOpen, setIsInfoOpen] = useState(false);

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

    const handleInfoToggle = () => {
        setIsInfoOpen(!isInfoOpen);
    };

    return (
        <div style={{ backgroundColor: 'red', margin: '5px' }}>
            <div
                style={{ backgroundColor: 'blue', cursor: 'pointer' }}
                onClick={handleInfoToggle}>
                <h3>{title}</h3>
            </div>
            <Assignee value={assignee}>
                <LogButton
                    active={activeLog != null}
                    onStart={onStart}
                    onStop={onStop}
                />
            </Assignee>
            <div>
                <TaskTime total={totalTime} log={activeLog} />
            </div>

            <Modal isOpen={isInfoOpen} onClose={handleInfoToggle}>
                <TaskInfo value={value} />
            </Modal>
        </div>
    );
};

export default Task;
