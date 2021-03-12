import { getToken } from './AuthAPI';
import RequestError from './RequestError';
import { API_URL } from './utils';

export const getTasks = async (projectID) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + `/api/project/${projectID}/task`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw await RequestError.parseResponse(response);
    }

    const tasks = await response.json();
    return tasks;
};

export const createTask = async (newTask) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + `/api/task`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newTask),
    });

    if (!response.ok) {
        throw await RequestError.parseResponse(response);
    }

    const { task } = await response.json();
    return task;
};

export const startTask = async (taskID) => {
    const time = new Date();

    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + `/api/task/${taskID}/start`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ time }),
    });

    if (!response.ok) throw await RequestError.parseResponse(response);

    return await response.json();
};

export const stopTask = async (taskID) => {
    const time = new Date();

    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + `/api/task/${taskID}/stop`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ time }),
    });

    if (!response.ok) throw await RequestError.parseResponse(response);

    return await response.json();
};

export const assignTask = async (taskID, userID) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + `/api/task/${taskID}/assign`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ assignee: { userID } }),
    });

    if (!response.ok) throw await RequestError.parseResponse(response);
};

export const completeTaskToggle = async (taskID, completed) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(
        API_URL +
            `/api/task/${taskID}/${completed ? 'complete' : 'incomplete'}`,
        {
            method: 'PUT',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    if (!response.ok) throw await RequestError.parseResponse(response);

    if (completed) return await response.json();
};

export const deleteTask = async (taskID) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + `/api/task/${taskID}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) throw await RequestError.parseResponse(response);
};

export const updateTask = async (taskID, value, field) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(
        API_URL + `/api/task/${taskID}?field=${field}`,
        {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ value }),
        },
    );

    if (!response.ok) throw await RequestError.parseResponse(response);
};
