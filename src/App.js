import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

//Contexts
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { GlobalSpinnerContextProvider } from './context/GlobalSpinnerContext';

//Pages
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage/LoginPage';

//Routes
import NotFoundRoute from './route/NotFoundRoute';
import AuthRoute from './route/AuthRoute';
import PrivateRoute from './route/PrivateRoute';

//Components
import GlobalSpinner from './component/GlobalSpinner';

const App = () => {
    return (
        <div className='App'>
            <GlobalSpinnerContextProvider>
                <AuthProvider>
                    <UserProvider>
                        <GlobalSpinner />
                        <Router>
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path='/'
                                    component={HomePage}
                                />
                                <AuthRoute exact path='/auth' />
                                <Route
                                    exact
                                    path='/login'
                                    component={LoginPage}
                                />
                                <Route component={NotFoundRoute} />
                            </Switch>
                        </Router>
                    </UserProvider>
                </AuthProvider>
            </GlobalSpinnerContextProvider>
        </div>
    );
};

export default App;
