import React from 'react';
import Timer from '../Timer';
import { calculateTime, formatTime } from '../../utils/time';

const TaskTime = ({ total, log }) => {
    if (!total && !log) {
        return null;
    } else if (!log) {
        return <div>{formatTime(total)}</div>;
    } else {
        return (
            <Timer
                total={calculateTime(total, log.startTime)}
                increment={1000}
            />
        );
    }
};

export default TaskTime;
