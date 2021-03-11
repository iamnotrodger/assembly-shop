import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectHeader from '../../component/ProjectHeader';
import TaskBoard from '../../component/TaskBoard';
import TaskButton from '../../component/TaskButton';
import { MembersProvider } from '../../context/MembersContext';
import { ProjectProvider } from '../../context/ProjectContext';
import { TasksProvider } from '../../context/TasksContext';

const ProjectPage = () => {
    const { teamID, projectID } = useParams();
    return (
        <div>
            <ProjectProvider teamID={teamID} projectID={projectID}>
                <ProjectHeader />
                <MembersProvider teamID={teamID}>
                    <TasksProvider teamID={teamID} projectID={projectID}>
                        <TaskBoard />
                        <TaskButton teamID={teamID} projectID={projectID} />
                    </TasksProvider>
                </MembersProvider>
            </ProjectProvider>
        </div>
    );
};

export default ProjectPage;
