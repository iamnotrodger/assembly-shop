import React from 'react';
import { createTask } from '../../api/TaskAPI';
import useMembers from '../../context/MembersContext';
import useTasks, { TASK_ACTIONS } from '../../context/TasksContext';
import useToast, {
    TOAST_ACTIONS,
    TOAST_STATE,
} from '../../context/ToastContext';
import { createErrorToast } from '../../utils/toast';
import { TaskSchema } from '../../utils/validate';
import Form from '../Form';
import FormField from '../FormField';
import FormSelect from '../FormSelect/FormSelect';
import FormSubmit from '../FormSubmit';
import FormTextArea from '../FormTextArea';

const CreateTask = ({ projectID, onClose }) => {
    const { members } = useMembers();
    const { tasksDispatch } = useTasks();
    const { toastDispatch } = useToast();

    const handleSubmit = async ({ title, description, assignee }) => {
        try {
            const newTask = {
                projectID,
                title,
                description,
                assignee: assignee ? { memberID: assignee.memberID } : null,
            };
            const task = await createTask(newTask);
            task.assignee = assignee;

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

    return (
        <Form
            initialValues={{ title: '', description: '', assignee: null }}
            onSubmit={handleSubmit}
            validationSchema={TaskSchema}>
            <h2 className='form__title heading-secondary'>Task</h2>
            <FormField name='title' label='Title' placeholder='Task Title' />
            <FormTextArea
                name='description'
                label='Description'
                placeholder='Description'
            />
            <FormSelect
                name='assignee'
                label='Assignee'
                placeholder='Select Team Member'
                options={members}
                getOptionLabel={({ user: { email } }) => email}
                getOptionValue={({ user: { userID } }) => userID}
            />
            <FormSubmit title='Create Task' />
        </Form>
    );
};

export default CreateTask;
