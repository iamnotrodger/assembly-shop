import React, {
    createContext,
    useCallback,
    useState,
    useEffect,
    useContext,
} from 'react';
import { getProfile } from '../../api/UserAPI';
import useAuth, { AUTH_ACTIONS } from '../AuthContext';
import { useGlobalActionSpinner } from '../GlobalSpinnerContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { authDispatch } = useAuth();
    const [user, setUser] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const setGlobalSpinner = useGlobalActionSpinner();

    //Gets the user on mount and very time user is logged in
    useEffect(() => {
        Login();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setIsAuthorized(user != null);
    }, [user]);

    const Login = useCallback(async () => {
        setGlobalSpinner(true);
        setIsLoaded(false);
        try {
            const accessToken = await authDispatch({
                type: AUTH_ACTIONS.GET_TOKEN,
            });
            const user = await getProfile(accessToken);
            setUser(user);
        } catch (error) {
            console.log(error);
        }
        setGlobalSpinner(false);
        setIsLoaded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Logout = useCallback(async () => {
        await authDispatch({ type: AUTH_ACTIONS.LOG_OUT });
        setUser(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserContext.Provider value={{ user, isAuthorized, isLoaded, Logout }}>
            {children}
        </UserContext.Provider>
    );
};

const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};

export default useUser;
