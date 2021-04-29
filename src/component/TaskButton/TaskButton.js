import React, { useState } from 'react';
import CreateTask from '../CreateTask';
import Modal from '../Modal';

import './TaskButton.scss';

const TaskButton = ({ teamID, projectID }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <i
                className='material-icons md-circle task-button btn--animate-pop'
                onClick={openToggle}>
                add
            </i>
            <Modal
                isOpen={isOpen}
                onClose={openToggle}
                classNames='modal-transition'
                timeout={300}>
                <CreateTask
                    onClose={openToggle}
                    teamID={teamID}
                    projectID={projectID}
                />
            </Modal>
        </>
    );
};

export default TaskButton;
