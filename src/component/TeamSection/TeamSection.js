import React from 'react';
import Project from '../Project';

const TeamSection = ({ value }) => {
    const { name, numMembers, projects } = value;

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
            </div>
            {projectMap}
        </div>
    );
};

export default TeamSection;
