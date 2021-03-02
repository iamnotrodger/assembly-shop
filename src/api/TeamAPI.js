import { getToken } from './AuthAPI';
import RequestError from './RequestError';

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
        throw new RequestError('Unable to get Teams.', response.status);
    }

    const teams = await response.json();
    return teams;
};

export const getTeamsByAdmin = async () => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + '/api/team/admin', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new RequestError('Unable to get Teams.', response.status);
    }

    const teams = await response.json();
    return teams;
};

export const createTeam = async (newTeam) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + '/api/team', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newTeam),
    });

    if (!response.ok) {
        throw new RequestError('Unable to create Team.', response.status);
    }

    const { team } = await response.json();
    return team;
};
