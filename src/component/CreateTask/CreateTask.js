import React, { useState } from 'react';
import Select from 'react-select';
import { createTask } from '../../api/TaskAPI';
import { useLoadingAction } from '../../context/LoadingContext';
import useMembers from '../../context/MembersContext';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';
import InputValidate from '../InputValidate/InputValidate';
import { validateTaskTitle } from '../../utils/validate';

const CreateTask = ({ teamID, projectID, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState(null);
    const [isTitleValid, setIsTitleValid] = useState(false);

    const members = useMembers();
    const { tasksDispatch } = useTasks();
    const setLoading = useLoadingAction();

    const handleTitleChange = (value, valid) => {
        setTitle(value);
        setIsTitleValid(valid);
    };

    const handleDescriptionChange = (event) => {
        const { value } = event.target;
        setDescription(value);
    };

    const onSelectAssignee = (value) => {
        setAssignee(value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const newTask = {
                title,
                description,
                assignee: assignee ? assignee.user : null,
            };
            const task = await createTask(teamID, projectID, newTask);
            tasksDispatch({ type: TASK_ACTIONS.ADD, payload: task });
            onClose();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div style={{ width: '50vw' }}>
            <label>
                Task Title
                <InputValidate
                    required
                    placeholder='Title'
                    value={title}
                    onChange={handleTitleChange}
                    validate={validateTaskTitle}
                />
            </label>

            <label>
                Description
                <input
                    placeholder='Description'
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </label>

            <div>
                <Select
                    placeholder='Member'
                    isClearable={false}
                    value={assignee}
                    options={members}
                    getOptionLabel={({ user: { email } }) => email}
                    getOptionValue={({ user: { userID } }) => userID}
                    onChange={onSelectAssignee}
                />
            </div>

            <button disabled={!isTitleValid} onClick={handleSubmit}>
                Create Task
            </button>
        </div>
    );
};

export default CreateTask;
