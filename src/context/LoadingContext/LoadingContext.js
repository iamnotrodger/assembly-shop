import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();
const LoadingActionContext = createContext();

export const LoadingContextProvider = (props) => {
    const [isLoading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={isLoading}>
            <LoadingActionContext.Provider value={setLoading}>
                {props.children}
            </LoadingActionContext.Provider>
        </LoadingContext.Provider>
    );
};

const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingContext');
    }

    return context;
};

export const useLoadingAction = () => {
    const context = useContext(LoadingActionContext);
    if (context === undefined) {
        throw new Error(
            'useLoadingAction must be used within a LoadingActionContext',
        );
    }

    return context;
};

export default useLoading;
