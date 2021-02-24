const API_URL = process.env.REACT_APP_API_URL;

//Available actions for token reducer
export const AUTH_ACTIONS = {
    GET_TOKEN: 'get_token',
    SET_TOKEN: 'set_token',
    LOG_OUT: 'log_out',
};

export const tokenReducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.SET_TOKEN:
            return action.payload;
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

//gets the token if it exist, else it grabs a new one
export const getToken = async (token) => {
    const expired = isTokenExpired(getTokenExpiration(token));
    //checks if the accessToken exist
    if (expired) {
        token = await refreshToken();
    }

    return token;
};

//Clears the Refresh-token from cookie
export const logout = async () => {
    try {
        const response = await fetch(API_URL + '/api/auth/token/logout', {
            method: 'post',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.log(error);
    }

    return null;
};

export const refreshToken = async () => {
    try {
        const response = await fetch(
            API_URL + '/api/auth/token/refresh-token',
            {
                method: 'post',
                credentials: 'include',
            },
        );

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const { accessToken } = await response.json();
        return accessToken;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getTokenExpiration = (accessToken) => {
    if (!accessToken) {
        return null;
    }

    const jwt = JSON.parse(atob(accessToken.split('.')[1]));
    //converts into milliseconds
    return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

const isTokenExpired = (exp) => {
    if (!exp) {
        return true;
    }

    return Date.now() > exp;
};
