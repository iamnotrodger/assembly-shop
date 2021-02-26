import React from 'react';
import useLoading from '../../context/LoadingContext';
import './LoadingScreen.scss';

const LoadingScreen = (props) => {
    const isLoading = useLoading();

    return isLoading ? (
        <div className='global-spinner-overlay'>
            <p>Loading...</p>
        </div>
    ) : null;
};

export default LoadingScreen;
