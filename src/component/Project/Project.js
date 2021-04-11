import React from 'react';
import { Link } from 'react-router-dom';

import './Project.scss';

const Project = ({ value: { projectID, name } }) => {
    const linkName = name.replace(/\s+/g, '-').toLowerCase();
    const color = projectID % 5;

    return (
        <Link
            className={`project project--${color}`}
            to={`/project/${projectID}/${linkName}`}>
            <h3 className='heading-tertiary project__title'>{name}</h3>
        </Link>
    );
};

export default Project;
