import React, { useEffect, useState } from 'react';
import useTasks from '../../context/TasksContext';
import TaskList from './TaskList';
import { filterTask } from './utils';

const TaskBoard = () => {
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
    return (
        <div>
            <TaskList title='Todo' value={todo} />
            <TaskList title='Doing' value={doing} />
            <TaskList title='Done' value={done} />
        </div>
    );
};

export default TaskBoard;
