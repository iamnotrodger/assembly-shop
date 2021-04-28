import React from 'react';

const LogButton = ({ active, onStart, onStop, completed }) => {
    if (completed) {
        return <i className='material-icons md-36 md-circle'>check</i>;
    }

    return (
        <i
            className='material-icons md-36 md-circle task__log-button btn--animate-pop'
            onClick={active ? onStop : onStart}>
            {active ? 'pause' : 'play_arrow'}
        </i>
    );
};

export default LogButton;
