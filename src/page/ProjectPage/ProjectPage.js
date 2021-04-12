import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectHeader from '../../component/ProjectHeader';
import TaskBoard from '../../component/TaskBoard';
import TaskButton from '../../component/TaskButton';
import { MembersProvider } from '../../context/MembersContext';
import { ProjectProvider } from '../../context/ProjectContext';
import { TasksProvider } from '../../context/TasksContext';

import './ProjectPage.scss';

const ProjectPage = () => {
    const { projectID } = useParams();
    return (
        <div className='project-page'>
            <div className='project-page__background'></div>
            <main className='project-page__main'>
                <ProjectProvider projectID={projectID}>
                    <MembersProvider projectID={projectID} loadOnMount>
                        <ProjectHeader />
                        <TasksProvider projectID={projectID}>
                            <TaskBoard />
                            <TaskButton projectID={projectID} />
                        </TasksProvider>
                    </MembersProvider>
                </ProjectProvider>
            </main>
        </div>
    );
};

export default ProjectPage;
