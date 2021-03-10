import React from 'react';
import { updateTask } from '../../api/TaskAPI';
import InputEditable from '../InputEditable/InputEditable';

const Description = ({ id, value, onUpdate }) => {
    const handleDescriptionSave = async (description) => {
        try {
            await updateTask(id, description, 'description');
            onUpdate({ description });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <label>
                Task Description
                <InputEditable
                    text={value}
                    type='text'
                    onSave={handleDescriptionSave}
                    hasButton>
                    <p>{value || 'Description'}</p>
                </InputEditable>
            </label>
        </div>
    );
};

export default Description;
