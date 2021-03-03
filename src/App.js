import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';
import './App.scss';

//Contexts
import { UserProvider } from './context/UserContext';
import { LoadingContextProvider } from './context/LoadingContext';
import { TeamsProvider } from './context/TeamsContext';

//Pages
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import ProjectPage from './page/ProjectPage';

//Routes
import AuthRoute from './route/AuthRoute';
import PrivateRoute from './route/PrivateRoute';

//Components
import ErrorFallback from './component/ErrorFallback';
import LoadingScreen from './component/LoadingScreen';
import NavBar from './component/NavBar';
import NotFound from './component/NotFound';

const App = () => {
    return (
        <div className='App'>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <LoadingContextProvider>
                    <UserProvider>
                        <TeamsProvider>
                            <LoadingScreen />
                            <Router>
                                <Routes />
                            </Router>
                        </TeamsProvider>
                    </UserProvider>
                </LoadingContextProvider>
            </ErrorBoundary>
        </div>
    );
};

const Routes = withRouter(({ location: { pathname } }) => (
    <>
        {pathname !== '/login' && <NavBar />}
        <Switch>
            <Route path='/login' component={LoginPage} />
            <AuthRoute path='/auth' />
            <PrivateRoute exact path='/' component={HomePage} />
            <PrivateRoute
                path='/team/:teamID/project/:projectID/'
                component={ProjectPage}
            />
            <Route component={NotFound} />
        </Switch>
    </>
));

export default App;
