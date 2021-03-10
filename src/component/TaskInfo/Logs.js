import React from 'react';
import LogList from './LogList';

const Logs = ({ value, onUpdate, owned }) => {
    const handleDeleteLog = (logID, totalTime) => {
        const task = {};

        if (totalTime != null) task.totalTime = totalTime;
        task.logs = value.filter((log) => log.logID !== logID);

        onUpdate(task);
    };

    return (
        <div>
            <h3>Logs</h3>
            <div>
                <LogList
                    value={value}
                    onDelete={handleDeleteLog}
                    owned={owned}
                />
            </div>
        </div>
    );
};

export default Logs;
