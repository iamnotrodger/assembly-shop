import { createContext, useContext, useState } from 'react';

const TeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
    const [teams, setTeams] = useState(undefined);

    return (
        <TeamsContext.Provider value={{ teams, setTeams }}>
            {children}
        </TeamsContext.Provider>
    );
};

const useTeams = () => {
    const context = useContext(TeamsContext);
    if (context === undefined) {
        throw new Error('useTeams must be used within a TeamsProvider');
    }
    return context;
};

export default useTeams;
