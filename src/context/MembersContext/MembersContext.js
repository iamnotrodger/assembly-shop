import React, { createContext, useCallback, useContext, useState } from 'react';
import { getMembers } from '../../api/MemberAPI';

const MembersContext = createContext();

export const MembersProvider = ({ children, teamID }) => {
    const [members, setMembers] = useState(null);

    const loadMembers = useCallback(async () => {
        try {
            const members = await getMembers(teamID);
            setMembers(members);
        } catch (error) {
            console.log(error);
        }
    }, [teamID]);

    return (
        <MembersContext.Provider value={{ members, loadMembers }}>
            {children}
        </MembersContext.Provider>
    );
};

const useMembers = () => {
    const context = useContext(MembersContext);
    if (context === undefined) {
        throw new Error('useMembers must be used within a MembersContext');
    }

    return context;
};

export default useMembers;
