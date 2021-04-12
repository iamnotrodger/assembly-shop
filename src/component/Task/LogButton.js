import React from 'react';

const LogButton = ({ active, onStart, onStop }) => {
    if (active) {
        return (
            <i
                className='material-icons md-36 md-circle task__log-button'
                onClick={onStop}>
                pause
            </i>
        );
    } else {
        return (
            <i
                className='material-icons md-36 md-circle task__log-button'
                onClick={onStart}>
                play_arrow
            </i>
        );
    }
};

export default LogButton;
