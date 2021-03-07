import React from 'react';
import Time from './Time';
import { calculateTime, formatTime } from './utils';

const TaskTime = ({ total, log }) => {
    if (!total && !log) {
        return null;
    } else if (!log) {
        return <div>{formatTime(total)}</div>;
    } else {
        return <Time total={calculateTime(total, log.startTime)} />;
    }
};

export default TaskTime;
