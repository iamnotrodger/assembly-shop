import React, { useEffect, useState } from 'react';
import { formatTime } from './utils';

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

export default Time;
