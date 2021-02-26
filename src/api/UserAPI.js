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
