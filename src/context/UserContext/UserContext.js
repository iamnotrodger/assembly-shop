import React, {
    createContext,
    useCallback,
    useState,
    useEffect,
    useContext,
} from 'react';
import { getProfile } from '../../api/UserAPI';
import useAuth, { AUTH_ACTIONS } from '../AuthContext/AuthContext';

const UserContext = createContext();

const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};

export const UserProvider = ({ children }) => {
    const { authDispatch } = useAuth();
    const [user, setUser] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);

    //Gets the user on mount and very time user is logged in
    useEffect(() => {
        Login();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setIsAuthorized(user == null);
    }, [user]);

    const Login = useCallback(async () => {
        try {
            const accessToken = await authDispatch({
                type: AUTH_ACTIONS.GET_TOKEN,
            });
            const user = await getProfile(accessToken);
            setUser(user);
        } catch (error) {
            console.log(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Logout = useCallback(async () => {
        await authDispatch({ type: AUTH_ACTIONS.LOG_OUT });
        setUser(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserContext.Provider value={{ user, isAuthorized, Logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default useUser;
