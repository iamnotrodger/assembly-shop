import { getToken } from './AuthAPI';
import RequestError from './RequestError';
import { API_URL } from './utils';

export const getProfile = async () => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    console.log('access-token: ', accessToken);
    console.log('getting user profile');
    const response = await fetch(API_URL + '/api/user', {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    console.log('got user profile');
    console.log('response: ', response);
    if (!response.ok) {
        console.log('response for user profile not okay');
        throw await RequestError.parseResponse(response);
    }

    console.log('getting user json');
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
