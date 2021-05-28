import React from 'react';
import Project from '../Project';
import './ProjectList.scss';

const ProjectList = ({ projects }) => {
    if (!projects || projects.length === 0) {
        return (
            <h3 className='heading-tertiary project-list__empty'>
                <i className='material-icons md-36'>ballot</i>
                No Projects Available
            </h3>
        );
    }

    return (
        <div className='project-list'>
            {projects.map((project) => (
                <Project value={project} key={project.projectID} />
            ))}
        </div>
    );
};

export default ProjectList;
