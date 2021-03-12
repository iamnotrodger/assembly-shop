import React from 'react';
import { Link } from 'react-router-dom';

const Project = ({ value: { projectID, name } }) => {
    const linkName = name.replace(/\s+/g, '-').toLowerCase();
    const color = backgroundColors[projectID % backgroundColors.length];

    return (
        <Link to={`/project/${projectID}/${linkName}`}>
            <div style={{ background: color, padding: '30px', margin: '5px' }}>
                <h3>{name}</h3>
            </div>
        </Link>
    );
};

const backgroundColors = ['red', 'aqua', 'green', 'yellow', 'orange'];

export default Project;
