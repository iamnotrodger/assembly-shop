import React, { useState } from 'react';
import Select from 'react-select';
import { createTask } from '../../api/TaskAPI';
import useMembers from '../../context/MembersContext';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';
import useToast, {
    TOAST_ACTIONS,
    TOAST_STATE,
} from '../../context/ToastContext';
import { createErrorToast } from '../../utils/toast';
import { validateTaskTitle } from '../../utils/validate';

const CreateTask = ({ projectID, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState(null);

    const [titleError, setTitleError] = useState(null);

    const { members } = useMembers();
    const { tasksDispatch } = useTasks();
    const { toastDispatch } = useToast();

    const handleTitleChange = (event) => {
        const { value } = event.target;
        setTitle(value);
    };

    const handleDescriptionChange = (event) => {
        const { value } = event.target;
        setDescription(value);
    };

    const onSelectAssignee = (value) => {
        setAssignee(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const valid = validateForm();
        if (!valid) return;

        try {
            const newTask = {
                projectID,
                title,
                description,
                assignee: assignee ? assignee.user : null,
            };
            const task = await createTask(newTask);

            tasksDispatch({ type: TASK_ACTIONS.ADD, payload: task });
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: {
                    state: TOAST_STATE.SUCCESS,
                    title: 'Task Created',
                },
            });

            if (onClose) onClose();
        } catch (error) {
            toastDispatch({
                type: TOAST_ACTIONS.ADD,
                payload: createErrorToast(error.message),
            });
        }
    };

    const validateForm = () => {
        const error = validateTaskTitle(title);
        setTitleError(error);

        return error == null;
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <h2 className='form__title heading-secondary'>Task</h2>

            <div className='form__group'>
                <label className='form__label'>
                    Task Title
                    <input
                        className={`form__input ${
                            titleError ? 'form__input--error' : ''
                        }`}
                        placeholder='Title'
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <span className='form__error'>{titleError}</span>
                </label>
            </div>

            <div className='form__group'>
                <label className='form__label'>
                    Description
                    <textarea
                        className='form__textarea'
                        placeholder='Description'
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </label>
            </div>

            <div className='form__group'>
                <label className='form__label'>
                    Member
                    <Select
                        className='form__select'
                        classNamePrefix='form__select'
                        placeholder='Member'
                        isClearable={false}
                        value={assignee}
                        options={members}
                        getOptionLabel={({ user: { email } }) => email}
                        getOptionValue={({ user: { userID } }) => userID}
                        onChange={onSelectAssignee}
                    />
                </label>
            </div>

            <button className='form__submit btn'>Create Task</button>
        </form>
    );
};

export default CreateTask;
