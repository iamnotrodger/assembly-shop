import React from 'react';
import TaskTime from '../TaskTime';

const TotalTime = ({ value, log }) => {
    if (!value && !log) return null;

    return (
        <div className='form__group'>
            <label className='form__label'>
                Total Time
                <TaskTime
                    className='form__input task-info__time'
                    total={value}
                    log={log}
                />
            </label>
        </div>
    );
};

export default TotalTime;
