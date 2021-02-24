import React from 'react';
import Project from '../Project/Project';

const TeamSection = ({ value }) => {
    const { teamID, name, administratorID, numMembers, projects } = value;

    const projectMap =
        projects && projects.length > 0 ? (
            <div>
                {projects.map((project) => (
                    <Project value={project} key={project.projectID} />
                ))}
            </div>
        ) : (
            <div>No Projects Available</div>
        );

    return (
        <div>
            <div>
                <h3>{name}</h3>
                <div>Members ({numMembers})</div>
                <div>Team ID: {teamID}</div>
                <div>administrator ID: {administratorID} </div>
            </div>
            {projectMap}
        </div>
    );
};

export default TeamSection;
