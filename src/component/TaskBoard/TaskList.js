import React from 'react';
import Task from '../Task';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const TaskList = ({ title, value, onClick }) => {
    return (
        <div className='task-list'>
            <h3 className='heading-tertiary task-list__title'>{title}</h3>
            <TransitionGroup className='task-list__list'>
                {value.map((task) => (
                    <CSSTransition
                        key={task.taskID}
                        timeout={300}
                        classNames='task-transition'>
                        <Task
                            key={task.taskID}
                            value={task}
                            onClick={() => onClick(task)}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default TaskList;
