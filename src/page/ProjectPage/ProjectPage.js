import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectHeader from '../../component/ProjectHeader';
import TaskBoard from '../../component/TaskBoard';
import TaskButton from '../../component/TaskButton';
import { MembersProvider } from '../../context/MembersContext';
import { ProjectProvider } from '../../context/ProjectContext';
import { TasksProvider } from '../../context/TasksContext';

const ProjectPage = () => {
    const { projectID } = useParams();
    return (
        <div>
            <ProjectProvider projectID={projectID}>
                <MembersProvider projectID={projectID} loadOnMount>
                    <ProjectHeader />
                    <TasksProvider projectID={projectID}>
                        <TaskBoard />
                        <TaskButton projectID={projectID} />
                    </TasksProvider>
                </MembersProvider>
            </ProjectProvider>
        </div>
    );
};

export default ProjectPage;
