import React from 'react';
import Timer from '../Timer';
import { calculateTime, formatTime } from '../../utils/time';

const TaskTime = ({ total, log, ...props }) => {
    if (!total && !log) {
        return null;
    } else if (!log) {
        return <div {...props}>{formatTime(total)}</div>;
    } else {
        return (
            <Timer
                total={calculateTime(total, log.startTime)}
                increment={1000}
                {...props}
            />
        );
    }
};

export default TaskTime;
