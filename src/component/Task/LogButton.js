import React from 'react';

const LogButton = ({ active, onStart, onStop }) => {
    return (
        <button
            style={{ borderRadius: '50%' }}
            onClick={active ? onStop : onStart}>
            {active ? '||' : '|>'}
        </button>
    );
};

export default LogButton;
