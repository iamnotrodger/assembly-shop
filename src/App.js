import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

//Contexts
import { UserProvider } from './context/UserContext';
import { LoadingContextProvider } from './context/LoadingContext';

//Pages
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage/LoginPage';

//Routes
import NotFoundRoute from './route/NotFoundRoute';
import AuthRoute from './route/AuthRoute';
import PrivateRoute from './route/PrivateRoute';

//Components
import LoadingScreen from './component/LoadingScreen';

const App = () => {
    return (
        <div className='App'>
            <LoadingContextProvider>
                <UserProvider>
                    <LoadingScreen />
                    <Router>
                        <Switch>
                            <PrivateRoute exact path='/' component={HomePage} />
                            <AuthRoute exact path='/auth' />
                            <Route exact path='/login' component={LoginPage} />
                            <Route component={NotFoundRoute} />
                        </Switch>
                    </Router>
                </UserProvider>
            </LoadingContextProvider>
        </div>
    );
};

export default App;
