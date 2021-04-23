import React from 'react';
import { updateTask } from '../../api/TaskAPI';
import InputEditable from '../InputEditable';

const Title = ({ id, value, onUpdate, editable }) => {
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
        <div className='form__group'>
            <label className='form__label'>
                Title
                <InputEditable
                    className='form__input'
                    editable={editable}
                    text={value}
                    onSave={handleTitleSave}
                    hasButton={true}>
                    <div className='form__input'>{value}</div>
                </InputEditable>
            </label>
        </div>
    );
};

export default Title;
