import React, { useEffect, useState } from 'react';
import { calculateTime, formatTime } from './utils';

const Timer = ({ total, log }) => {
    if (!total && !log) {
        return null;
    } else if (!log) {
        return <div>{formatTime(total)}</div>;
    } else {
        return <Time total={calculateTime(total, log.startTime)} />;
    }
};

const Time = ({ total }) => {
    const [time, setTime] = useState(total);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(time + 1000);
        }, 1000);

        return () => clearTimeout(timer);
    }, [time]);

    return <div>{formatTime(time)}</div>;
};

export default Timer;
