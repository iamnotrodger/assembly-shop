import React from 'react';

const LogButton = ({ active, onStart, onStop }) => {
    return (
        <i
            className='material-icons md-36 md-circle task__log-button btn--animate-pop'
            onClick={active ? onStop : onStart}>
            {active ? 'pause' : 'play_arrow'}
        </i>
    );
};

export default LogButton;
