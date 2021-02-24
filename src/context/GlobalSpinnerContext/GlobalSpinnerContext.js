import React, { createContext, useContext, useState } from 'react';

const GlobalSpinnerContext = createContext();
const GlobalSpinnerActionsContext = createContext();

export const GlobalSpinnerContextProvider = (props) => {
    const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false);

    return (
        <GlobalSpinnerContext.Provider value={isGlobalSpinnerOn}>
            <GlobalSpinnerActionsContext.Provider value={setGlobalSpinner}>
                {props.children}
            </GlobalSpinnerActionsContext.Provider>
        </GlobalSpinnerContext.Provider>
    );
};

const useGlobalSpinner = () => {
    const context = useContext(GlobalSpinnerContext);
    if (context === undefined) {
        throw new Error(
            'useGlobalSpinner must be used within a GlobalSpinnerContext',
        );
    }

    return context;
};

export const useGlobalActionSpinner = () => {
    const context = useContext(GlobalSpinnerActionsContext);
    if (context === undefined) {
        throw new Error(
            'useGlobalActionSpinner must be used within a GlobalSpinnerActionContext',
        );
    }

    return context;
};

export default useGlobalSpinner;
