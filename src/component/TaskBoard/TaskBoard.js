import React from 'react';

const TaskBoard = ({ title, value }) => {
    const taskList = value.map((task) => <div>{JSON.stringify(task)}</div>);

    return (
        <div>
            <h3>{title}</h3>
            <div>{taskList}</div>
        </div>
    );
};

export default TaskBoard;
