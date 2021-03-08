import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectHeader from '../../component/ProjectHeader';
import TaskBoard from '../../component/TaskBoard';
import TaskButton from '../../component/TaskButton/TaskButton';
import { MembersProvider } from '../../context/MembersContext';
import { TasksProvider } from '../../context/TasksContext';

const ProjectPage = () => {
    const { teamID, projectID } = useParams();
    return (
        <div>
            <ProjectHeader teamID={teamID} projectID={projectID} />
            <MembersProvider teamID={teamID}>
                <TasksProvider teamID={teamID} projectID={projectID}>
                    <TaskBoard />
                    <TaskButton teamID={teamID} projectID={projectID} />
                </TasksProvider>
            </MembersProvider>
        </div>
    );
};

export default ProjectPage;
