import React from 'react';
import './GlobalSpinner.scss';
import useGlobalSpinnerContext from '../../context/GlobalSpinnerContext';

const GlobalSpinner = (props) => {
    const isGlobalSpinnerOn = useGlobalSpinnerContext();
    return isGlobalSpinnerOn ? (
        <div className='global-spinner-overlay'>
            <p>Loading...</p>
        </div>
    ) : null;
};

export default GlobalSpinner;
