import { getToken } from './AuthAPI';
import RequestError from './RequestError';
import { API_URL } from './utils';

export const getProfile = async () => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + '/api/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw await RequestError.parseResponse(response);
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
        throw await RequestError.parseResponse(response);
    }

    const users = await response.json();
    return users;
};
