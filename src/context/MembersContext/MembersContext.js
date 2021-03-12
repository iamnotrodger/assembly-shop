import React, { createContext, useContext, useEffect, useState } from 'react';
import { getProjectMembers, getTeamMembers } from '../../api/MemberAPI';

const MembersContext = createContext();

export const MembersProvider = ({ children, teamID, projectID }) => {
    const [members, setMembers] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let members;

                if (teamID) {
                    members = await getTeamMembers(teamID);
                } else {
                    members = await getProjectMembers(projectID);
                }

                setMembers(members);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [teamID, projectID]);

    return (
        <MembersContext.Provider value={members}>
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
