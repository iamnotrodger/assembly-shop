import React from 'react';
import LoginButton from './LoginButton';
import LoginData from './LoginData';

const Login = () => {
    const LoginButtons = LoginData.map((login, i) => {
        return <LoginButton key={i} login={login} />;
    });

    return <div>{LoginButtons}</div>;
};

export default Login;
