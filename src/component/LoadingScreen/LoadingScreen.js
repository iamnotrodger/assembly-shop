import React from 'react';
import useLoading from '../../context/LoadingContext';
import './LoadingScreen.scss';

const LoadingScreen = () => {
    const isLoading = useLoading();

    if (!isLoading) return null;

    return (
        <div className='global-spinner-overlay'>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingScreen;
