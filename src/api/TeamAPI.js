import { getToken } from './AuthAPI';

const API_URL = process.env.REACT_APP_API_URL;

export const getTeams = async () => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + '/api/team', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Unable to get Teams.');
    }

    const teams = await response.json();
    return teams;
};
