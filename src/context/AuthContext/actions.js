const API_URL = process.env.REACT_APP_API_URL;

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
