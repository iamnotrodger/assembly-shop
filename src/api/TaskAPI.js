import { getToken } from './AuthAPI';
import RequestError from './RequestError';

const API_URL = process.env.REACT_APP_API_URL;

export const getTasks = async (teamID, projectID) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(
        API_URL + `/api/team/${teamID}/project/${projectID}/task`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    if (!response.ok) {
        throw await RequestError.parseResponse(response);
    }

    const tasks = await response.json();
    return tasks;
};

export const startTask = async (taskID) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + `/api/task/${taskID}/start`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw await RequestError.parseResponse(response);
    }

    const log = await response.json();
    return log;
};

export const stopTask = async (taskID) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + `/api/task/${taskID}/stop`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw await RequestError.parseResponse(response);
    }

    const log = await response.json();
    return log;
};
