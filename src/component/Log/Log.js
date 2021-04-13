import React from 'react';
import { deleteLog } from '../../api/LogAPI';
import {
    calculateTime,
    calculateTotal,
    formatAMPM,
    formatTime,
} from '../../utils/time';
import Timer from '../Timer';

import './Log.scss';

const Log = ({ value, removable, onDelete }) => {
    const { logID, startTime, endTime } = value;

    const handleDelete = async () => {
        try {
            const { totalTime } = await deleteLog(logID);
            onDelete(logID, totalTime);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='log'>
            <div className='log__content'>
                {endTime ? (
                    <div className='log__time'>
                        {formatTime(calculateTotal(startTime, endTime))}
                    </div>
                ) : (
                    <Timer
                        className='log__time'
                        total={calculateTime(0, startTime)}
                        increment={1000}
                    />
                )}
                <div className='log__start'>{formatAMPM(startTime)}</div>
                <i className='material-icons md-24 log__arrow'>arrow_forward</i>
                <div className='log__end'>{formatAMPM(endTime)}</div>
                {removable && endTime ? (
                    <i
                        className='material-icons md-36 log__clear'
                        onClick={handleDelete}>
                        clear
                    </i>
                ) : null}
            </div>
            <div className='log__date'>
                {new Date(startTime).toDateString()}
            </div>
        </div>
    );
};

export default Log;
