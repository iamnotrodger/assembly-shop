import React from 'react';
import { Link } from 'react-router-dom';

const Project = ({ value }) => {
    const { projectID, teamID, name } = value;

    const linkName = name.replace(/\s+/g, '-').toLowerCase();
    const color = backgroundColors[projectID % backgroundColors.length];

    return (
        <Link
            to={`/team/${teamID}/project/${projectID}/${linkName}`}
            style={{ background: color }}>
            {name}
        </Link>
    );
};

const backgroundColors = ['red', 'blue', 'green', 'yellow', 'orange'];

export default Project;
