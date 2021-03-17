import { createContext, useContext, useReducer, useState } from 'react';
import { reducer } from './utils';

const TeamsContext = createContext();
const UsersTeamsContext = createContext();

export const TeamsProvider = ({ children }) => {
    const [teams, teamsDispatch] = useReducer(reducer, undefined);
    const [usersTeams, setUsersTeams] = useState(undefined);

    return (
        <TeamsContext.Provider value={{ teams, teamsDispatch }}>
            <UsersTeamsContext.Provider value={{ usersTeams, setUsersTeams }}>
                {children}
            </UsersTeamsContext.Provider>
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

export const useUsersTeams = () => {
    const context = useContext(UsersTeamsContext);
    if (context === undefined) {
        throw new Error('useUsersTeams must be used within a TeamsProvider');
    }
    return context;
};

export default useTeams;
