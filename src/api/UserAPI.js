import { getToken } from './AuthAPI';
import RequestError from './RequestError';

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
        throw new RequestError('Unable to get user Profile', response.status);
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
        throw new RequestError('Unable to get Users', response.status);
    }

    const users = await response.json();
    return users;
};
