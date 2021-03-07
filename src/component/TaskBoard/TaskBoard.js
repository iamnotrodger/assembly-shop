import React, { useEffect, useState } from 'react';
import useTasks from '../../context/TasksContext';
import TaskList from './TaskList';

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

const filterTask = (tasks) => {
    const todo = [];
    const doing = [];
    const done = [];

    tasks.forEach((task, index) => {
        const { completed, activeLog, totalTime } = task;
        task.index = index;

        if (completed) {
            done.push(task);
        } else if (activeLog || totalTime > 0) {
            doing.push(task);
        } else {
            todo.push(task);
        }
    });

    return { todo, doing, done };
};

export default TaskBoard;
