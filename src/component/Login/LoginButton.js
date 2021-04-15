import React from 'react';

const LoginButton = ({ login }) => {
    const { icon, href, name } = login;

    return (
        <a href={href} className={`login__button login__button--${name}`}>
            <i className='material-icons md-36 login__icon'>{icon}</i>
            <span className='login__text'>Continue with {name}</span>
        </a>
    );
};

export default LoginButton;
