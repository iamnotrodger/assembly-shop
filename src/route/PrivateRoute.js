import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useUser from '../context/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthorized, isLoaded } = useUser();

    if (!isLoaded) return null;

    //Store Redirect value for login
    if (!isAuthorized) {
        const { pathname } = window.location;
        window.localStorage.setItem('redirectUrl', pathname);
    }

    return (
        <Route
            {...rest}
            component={(props) =>
                isAuthorized ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    );
};

export default PrivateRoute;
