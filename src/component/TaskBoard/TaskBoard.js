import React, { useEffect, useState } from 'react';
import useTasks from '../../context/TasksContext';
import Modal from '../Modal';
import TaskInfo from '../TaskInfo/TaskInfo';
import TaskList from './TaskList';
import { filterTask } from './utils';

import './TaskBoard.scss';

const TaskBoard = () => {
    const [taskInfo, setTaskInfo] = useState(null);
    const [todo, setTodo] = useState([]);
    const [doing, setDoing] = useState([]);
    const [done, setDone] = useState([]);

    const { tasks } = useTasks();

    useEffect(() => {
        filterAndSet(tasks);
    }, [tasks]);

    const filterAndSet = (tasks) => {
        const { todo, doing, done } = filterTask(tasks);
        setTodo(todo);
        setDoing(doing);
        setDone(done);
    };

    const showTaskInfo = (task) => {
        setTaskInfo(task);
    };

    return (
        <section className='task-board'>
            <TaskList title='Todo' value={todo} onClick={showTaskInfo} />
            <TaskList title='Doing' value={doing} onClick={showTaskInfo} />
            <TaskList title='Done' value={done} onClick={showTaskInfo} />

            <Modal
                isOpen={taskInfo != null}
                onClose={() => setTaskInfo(null)}
                classNames='modal-transition'
                timeout={300}>
                <TaskInfo value={taskInfo} onClose={() => setTaskInfo(null)} />
            </Modal>
        </section>
    );
};

export default TaskBoard;
