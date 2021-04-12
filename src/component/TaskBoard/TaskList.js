import React from 'react';
import Task from '../Task';

const TaskList = ({ title, value }) => {
    return (
        <div className='task-list'>
            <h3 className='heading-tertiary task-list__title'>{title}</h3>
            <div className='task-list__list'>
                {value.map((task) => (
                    <Task key={task.taskID} value={task} />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
