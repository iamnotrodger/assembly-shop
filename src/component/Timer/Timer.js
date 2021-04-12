import React, { useEffect, useState } from 'react';
import { formatTime } from '../../utils/time';

const Timer = ({ total, increment, ...props }) => {
    const [time, setTime] = useState(total);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(time + 1000);
        }, increment);

        return () => clearTimeout(timer);
    }, [increment, time]);

    useEffect(() => {
        setTime(total);
    }, [total]);

    return <div {...props}>{formatTime(time)}</div>;
};

export default Timer;
