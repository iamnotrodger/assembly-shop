import { getToken } from './AuthAPI';

const API_URL = process.env.REACT_APP_API_URL;

export const getTeamAndProjects = async () => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + '/api/project', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Unable to get Projects.');
    }

    const projects = await response.json();
    return projects;
};
