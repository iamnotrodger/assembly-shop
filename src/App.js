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
import { LoadingContextProvider } from './context/LoadingContext';
import { UserProvider } from './context/UserContext';
import { TeamsProvider } from './context/TeamsContext';
import { ToastProvider } from './context/ToastContext';

//Pages
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import ProjectPage from './page/ProjectPage';
import TeamPage from './page/TeamPage';

//Routes
import AuthRoute from './route/AuthRoute';
import PrivateRoute from './route/PrivateRoute';

//Components
import ErrorFallback from './component/ErrorFallback';
import LoadingScreen from './component/LoadingScreen';
import NavBar from './component/NavBar';
import NotFound from './component/NotFound';
import Toast from './component/Toast';

const App = () => {
    return (
        <div className='App'>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <LoadingContextProvider>
                    <ToastProvider autoDelete dismissTime={3000}>
                        <LoadingScreen />
                        <Toast position='top-left' />
                        <Router>
                            <UserProvider>
                                <TeamsProvider>
                                    <Routes />
                                </TeamsProvider>
                            </UserProvider>
                        </Router>
                    </ToastProvider>
                </LoadingContextProvider>
            </ErrorBoundary>
        </div>
    );
};

const Routes = withRouter(({ location: { pathname } }) => (
    <>
        {pathname !== '/login' && <NavBar />}
        <Switch>
            <PrivateRoute exact path='/' component={HomePage} />
            <PrivateRoute path='/project/:projectID/' component={ProjectPage} />
            <PrivateRoute path='/team/:teamID' component={TeamPage} />
            <Route path='/login' component={LoginPage} />
            <AuthRoute path='/auth' />
            <Route component={NotFound} />
        </Switch>
    </>
));

export default App;
