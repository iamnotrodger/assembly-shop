import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

//Contexts
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

//Pages
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage/LoginPage';

//Routes
import NotFoundRoute from './route/NotFoundRoute';

const App = () => {
    return (
        <div className='App'>
            <AuthProvider>
                <UserProvider>
                    <Router>
                        <Switch>
                            <Route exact path='/' component={HomePage} />
                            <Route exact path='/login' component={LoginPage} />
                            <Route component={NotFoundRoute} />
                        </Switch>
                    </Router>
                </UserProvider>
            </AuthProvider>
        </div>
    );
};

export default App;
