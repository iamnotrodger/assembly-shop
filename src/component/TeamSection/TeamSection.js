import React from 'react';

const TeamSection = ({ team }) => {
    const { teamID, name, administratorID, numMembers, projects } = team;

    return (
        <div>
            <div>
                <h3>{name}</h3>
                <div>Members ({numMembers})</div>
                <div>Team ID: {teamID}</div>
                <div>administrator ID: {administratorID} </div>
            </div>
            <div>{JSON.stringify(projects)}</div>
        </div>
    );
};

export default TeamSection;
