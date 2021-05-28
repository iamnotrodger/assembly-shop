import React, { useState } from 'react';
import { useParams } from 'react-router';
import { getTeamsProject } from '../../api/TeamAPI';
import ProjectList from '../../component/ProjectList/ProjectList';
import TabBoard from '../../component/TabBoard';
import TeamHeader from '../../component/TeamHeader';
import TeamMembers from '../../component/TeamMembers';
import TeamSettings from '../../component/TeamSettings';
import { MembersProvider } from '../../context/MembersContext';

import './TeamPage.scss';

const TeamPage = () => {
    const [projects, setProjects] = useState(null);
    const { teamID } = useParams();

    const handleProjectTabClick = async () => {
        if (projects) return;

        try {
            const teamProjects = await getTeamsProject(teamID);
            setProjects(teamProjects);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className='team-page'>
            <MembersProvider teamID={teamID} loadOnMount>
                <div className='team-page__header'>
                    <TeamHeader teamID={teamID} />
                </div>

                <div className='team-page__content-container'>
                    <TabBoard>
                        <div label='Members'>
                            <div className='team-page__content team-page__content--members'>
                                <TeamMembers />
                            </div>
                        </div>
                        <div label='Projects' onClick={handleProjectTabClick}>
                            <div className='team-page__content team-page__content--settings'>
                                <ProjectList projects={projects} />
                            </div>
                        </div>
                        <div label='Settings'>
                            <div className='team-page__content team-page__content--settings'>
                                <TeamSettings teamID={teamID} />
                            </div>
                        </div>
                    </TabBoard>
                </div>
            </MembersProvider>
        </main>
    );
};

export default TeamPage;
