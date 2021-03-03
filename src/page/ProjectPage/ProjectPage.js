import React from 'react';
import { useParams } from 'react-router-dom';
import TaskBoard from '../../component/TaskBoard';
import { MembersProvider } from '../../context/MembersContext';

const ProjectPage = () => {
    const { teamID, projectID } = useParams();

    return (
        <div>
            <MembersProvider teamID={teamID}>
                <TaskBoard teamID={teamID} projectID={projectID} />
            </MembersProvider>
        </div>
    );
};

export default ProjectPage;
