import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectHeader from '../../component/ProjectHeader';
import TaskBoard from '../../component/TaskBoard';
import { MembersProvider } from '../../context/MembersContext';

const ProjectPage = () => {
    const { teamID, projectID } = useParams();

    return (
        <div>
            <ProjectHeader teamID={teamID} projectID={projectID} />
            <MembersProvider teamID={teamID}>
                <TaskBoard teamID={teamID} projectID={projectID} />
            </MembersProvider>
        </div>
    );
};

export default ProjectPage;
