import React from 'react';
import { updateTask } from '../../api/TaskAPI';
import InputEditable from '../InputEditable';

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
        <div className='form__group'>
            <label className='form__label'>
                Task Description
                <InputEditable
                    className='form__textarea'
                    text={value}
                    type='text'
                    onSave={handleDescriptionSave}
                    textarea
                    hasButton>
                    <textarea
                        readOnly
                        className='form__textarea'
                        value={value || 'Description'}
                    />
                </InputEditable>
            </label>
        </div>
    );
};

export default Description;
