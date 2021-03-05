import React from 'react';
import Task from '../Task';

const TaskList = ({ title, value }) => {
    return (
        <div>
            <h3>{title}</h3>
            {value.map((task) => (
                <Task key={task.taskID} value={task} />
            ))}
        </div>
    );
};

export default TaskList;
