import React, { useState } from 'react';
import Select from 'react-select';
import { createTask } from '../../api/TaskAPI';
import { useLoadingAction } from '../../context/LoadingContext';
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
    const setLoading = useLoadingAction();

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

        setLoading(true);
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
        setLoading(false);
    };

    const validateForm = () => {
        const error = validateTaskTitle(title);
        setTitleError(error);

        return error == null;
    };

    return (
        <div style={{ width: '50vw' }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>Task</h2>
                </div>

                <div>
                    <label>
                        Task Title
                        <input
                            placeholder='Title'
                            value={title}
                            onChange={handleTitleChange}
                        />
                        <span>{titleError}</span>
                    </label>
                </div>

                <div>
                    <label>
                        Description
                        <input
                            placeholder='Description'
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </label>
                </div>

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

                <div>
                    <button onClick={handleSubmit}>Create Task</button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
