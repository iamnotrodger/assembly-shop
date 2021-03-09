import React from 'react';
import Log from '../Log/Log';

const LogList = ({ value, owned, onDelete }) => {
    if (!value) return null;

    return value.map((log) => (
        <Log
            key={log.logID}
            value={log}
            removable={owned}
            onDelete={onDelete}
        />
    ));
};

export default LogList;
