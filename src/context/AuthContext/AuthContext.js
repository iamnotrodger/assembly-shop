import React, {
    createContext,
    useCallback,
    useContext,
    useReducer,
} from 'react';
import { AUTH_ACTIONS, tokenReducer, getToken, logout } from './actions';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, tokenDispatch] = useReducer(tokenReducer, null);

    //middleware for authDispatch to allow async calls
    const tokenMiddleware = useCallback(async (action) => {
        let newToken;
        switch (action.type) {
            case AUTH_ACTIONS.GET_TOKEN:
                newToken = await getToken(token);
                break;
            case AUTH_ACTIONS.LOG_OUT:
                newToken = await logout();
                break;
            default:
                tokenDispatch(action);
                return null;
        }
        //changes the state of the token
        tokenDispatch({
            type: AUTH_ACTIONS.SET_TOKEN,
            payload: newToken,
        });
        return newToken;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider
            value={{
                //For changing the state of the token, as well as returning the new state
                authDispatch: tokenMiddleware,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
};

export default useAuth;
