import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MembersProvider } from '../../context/MembersContext';
import MemberSection from '../MemberSection';
import Modal from '../Modal';
import Project from '../Project';

import './TeamSection.scss';

const TeamSection = ({ value: { teamID, name, numMembers, projects } }) => {
    const [showMembers, setShowMembers] = useState(false);

    const handleShowMembersToggle = () => {
        setShowMembers(!showMembers);
    };

    const linkName = name.replace(/\s+/g, '-').toLowerCase();

    return (
        <section className='team-section'>
            <div className='team-section__header'>
                <h2 className='heading-secondary team-section__title'>
                    {name}
                </h2>
                <div
                    className='team-section__members animate-hover-primary'
                    onClick={handleShowMembersToggle}>
                    <i className='material-icons md-24 team-section__members-icon'>
                        person
                    </i>
                    <p className='paragraph team-section__members-text'>
                        Members ({numMembers})
                    </p>
                </div>
                <Link
                    className='team-section__settings'
                    to={`/team/${teamID}/${linkName}`}>
                    <i className='material-icons md-36 animate-hover-primary'>
                        settings
                    </i>
                </Link>
            </div>

            {projects && projects.length > 0 ? (
                <div className='team-section__projects'>
                    {projects.map((project) => (
                        <Project value={project} key={project.projectID} />
                    ))}
                </div>
            ) : (
                <h2 className='heading-tertiary team-section__no-project'>
                    <i className='material-icons md-36'>ballot</i>
                    No Projects Available
                </h2>
            )}

            <MembersProvider teamID={teamID}>
                <Modal
                    isOpen={showMembers}
                    onClose={handleShowMembersToggle}
                    classNames='modal-transition'
                    timeout={300}>
                    <div className='member-modal'>
                        <h2 className='heading-secondary member-modal__title'>
                            Members
                        </h2>
                        <MemberSection />
                    </div>
                </Modal>
            </MembersProvider>
        </section>
    );
};

export default TeamSection;
