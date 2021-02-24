import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//This is the route for the redirect after OAuth login. When redirected here by the API, it will attempt to load in the user and  then redirect the user back to original route where user tried to login.
const AuthRoute = () => {
    const redirectUrl = window.localStorage.getItem('redirectUrl') || '/';
    console.log(redirectUrl);

    useEffect(() => {
        return window.localStorage.removeItem('redirectUrl');
    }, []);

    return <Redirect to={redirectUrl} />;
};

export default AuthRoute;
