import React from 'react';
import { Route } from 'react-router-dom';
import useUser from '../contexts/UserContext';
import { Login } from '../components/Login';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthorized } = useUser();
    return (
        <Route
            {...rest}
            component={(props) =>
                isAuthorized ? <Component {...props} /> : <Login />
            }
        />
    );
};

export default PrivateRoute;
