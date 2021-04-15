import React from 'react';
import Login from '../../component/Login';

import './LoginPage.scss';

const LoginPage = () => {
    return (
        <main className='login-page'>
            <h1 className='heading-primary login-page__title'>Assembly-Shop</h1>
            <Login />
        </main>
    );
};

export default LoginPage;
