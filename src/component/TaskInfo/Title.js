import React from 'react';
import { updateTask } from '../../api/TaskAPI';
import InputEditable from '../InputEditable/InputEditable';

const Title = ({ id, value, onUpdate }) => {
    const handleTitleSave = async (title) => {
        try {
            if (!title) return;

            await updateTask(id, title, 'title');
            onUpdate({ title });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <label>
                Task Title
                <InputEditable text={value} onSave={handleTitleSave}>
                    <h2>{value}</h2>
                </InputEditable>
            </label>
        </div>
    );
};

export default Title;
