import React from 'react';
import LoginButton from './LoginButton';
import LoginData from './LoginData';

import './Login.scss';

const Login = () => {
    const LoginButtons = LoginData.map((login, i) => {
        return <LoginButton key={i} login={login} />;
    });

    return (
        <div className='login'>
            <h3 className='heading-tertiary login__title'>Login</h3>
            <div className='login__button-container'>{LoginButtons}</div>
        </div>
    );
};

export default Login;
