import React from 'react';

const LoginButton = ({ login }) => {
    const { img, href, name } = login;

    return (
        <a href={href} className={`btn login-btn .${name}`}>
            <img src={img} alt='login-icon' className='login-icon' />
            <span className='btn-txt'>Continue with {name}</span>
        </a>
    );
};

export default LoginButton;
