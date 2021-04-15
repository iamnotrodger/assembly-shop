import React from 'react';
import UserIcon from '../UserIcon';

import './Member.scss';

const Member = ({ value, onDelete }) => {
    return (
        <div className='member'>
            <UserIcon value={value.user} />
            <div className='member__email'>{value.user.email}</div>
            {value.admin ? <div className='member__role'>ADMIN</div> : null}
            {onDelete ? (
                <i
                    className=' material-icons md-36 member__button animate-hover-primary'
                    onClick={onDelete}>
                    clear
                </i>
            ) : null}
        </div>
    );
};

export default Member;
