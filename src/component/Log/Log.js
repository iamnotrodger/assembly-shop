import React from 'react';
import { deleteLog } from '../../api/LogAPI';
import {
    calculateTime,
    calculateTotal,
    formatAMPM,
    formatTime,
} from '../../utils/time';
import Time from '../Time';

const Log = ({ value, removable, onDelete }) => {
    const { logID, taskID, startTime, endTime } = value;

    const handleDelete = async () => {
        try {
            const { totalTime } = await deleteLog(taskID, logID);
            onDelete(logID, totalTime);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div style={style}>
                {endTime ? (
                    <div>{formatTime(calculateTotal(startTime, endTime))}</div>
                ) : (
                    <Time total={calculateTime(0, startTime)} />
                )}

                <span>
                    <span>{formatAMPM(startTime)}</span>
                    <span>{'->'}</span>
                    <span>{formatAMPM(endTime)}</span>
                    {removable && endTime ? (
                        <button onClick={handleDelete}>{'X'}</button>
                    ) : null}
                </span>
            </div>
            <div>{new Date(startTime).toDateString()}</div>
        </div>
    );
};

const style = {
    backgroundColor: 'red',
    margin: '5px',
};

export default Log;
