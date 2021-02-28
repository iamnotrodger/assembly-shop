import { getToken } from './AuthAPI';

const API_URL = process.env.REACT_APP_API_URL;

export const getProfile = async () => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + '/api/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Unable to get user profile.');
    }

    const profile = await response.json();
    return profile;
};

export const getUsers = async (email) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + `/api/user/find?email=${email}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Unable to get Users.');
    }

    const users = await response.json();
    return users;
};
