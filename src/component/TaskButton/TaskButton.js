import React, { useState } from 'react';
import CreateTask from '../CreateTask/CreateTask';
import Modal from '../Modal';

const TaskButton = ({ teamID, projectID }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button style={style} onClick={openToggle}>
                {'+'}
            </button>
            <Modal isOpen={isOpen} onClose={openToggle}>
                <CreateTask
                    onClose={openToggle}
                    teamID={teamID}
                    projectID={projectID}
                />
            </Modal>
        </>
    );
};

const style = {
    borderRadius: '50%',
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: '75px',
    height: '75px',
    cursor: 'pointer',
    margin: '30px',
};

export default TaskButton;
