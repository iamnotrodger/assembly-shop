import React from 'react';
import Log from '../Log';

const Logs = ({ value, onUpdate, editable }) => {
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
                {value.map((log) => (
                    <Log
                        key={log.logID}
                        value={log}
                        removable={editable}
                        onDelete={handleDeleteLog}
                    />
                ))}
            </label>
        </div>
    );
};

export default Logs;
