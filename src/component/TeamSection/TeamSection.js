import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MembersProvider } from '../../context/MembersContext';
import Modal from '../Modal';
import Project from '../Project';
import TeamMembers from '../TeamMembers';

const TeamSection = ({ value: { teamID, name, numMembers, projects } }) => {
    const [showMembers, setShowMembers] = useState(false);

    const handleShowMembersToggle = () => {
        setShowMembers(!showMembers);
    };

    const linkName = name.replace(/\s+/g, '-').toLowerCase();
    const projectMap =
        projects && projects.length > 0 ? (
            <div>
                {projects.map((project) => (
                    <Project value={project} key={project.projectID} />
                ))}
            </div>
        ) : (
            <div>No Projects Available</div>
        );

    return (
        <div>
            <div>
                <h3>{name}</h3>
                <div onClick={handleShowMembersToggle}>
                    Members ({numMembers})
                </div>
                <Link to={`/team/${teamID}/${linkName}`}>
                    <div>Settings</div>
                </Link>
            </div>

            {projectMap}

            <MembersProvider teamID={teamID}>
                <Modal isOpen={showMembers} onClose={handleShowMembersToggle}>
                    <div style={{ width: '50vw' }}>
                        <TeamMembers />
                    </div>
                </Modal>
            </MembersProvider>
        </div>
    );
};

export default TeamSection;
