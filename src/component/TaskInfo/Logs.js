import React from 'react';
import LogList from './LogList';

const Logs = ({ value, onUpdate, owned }) => {
    const handleDeleteLog = (logID, totalTime) => {
        const task = {};

        if (totalTime != null) task.totalTime = totalTime;
        task.logs = value.filter((log) => log.logID !== logID);

        onUpdate(task);
    };

    if (!value || value.length === 0) return null;

    return (
        <div className='form__group'>
            <label className='form__label'>
                Logs
                <LogList
                    value={value}
                    onDelete={handleDeleteLog}
                    owned={owned}
                />
            </label>
        </div>
    );
};

export default Logs;
