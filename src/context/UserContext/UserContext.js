import React, {
    createContext,
    useCallback,
    useState,
    useEffect,
    useContext,
} from 'react';
import { useHistory } from 'react-router';
import { logout } from '../../api/AuthAPI';
import { getProfile } from '../../api/UserAPI';
import { useLoadingAction } from '../LoadingContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const setLoading = useLoadingAction();
    const history = useHistory();

    //Gets the user on mount and very time user is logged in
    useEffect(() => {
        Login();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setIsAuthorized(user != null);
    }, [user]);

    const Login = useCallback(async () => {
        setLoading(true);
        setIsLoaded(false);
        try {
            const user = await getProfile();
            setUser(user);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
        setIsLoaded(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const Logout = useCallback(async () => {
        await logout();
        history.push('/');
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
