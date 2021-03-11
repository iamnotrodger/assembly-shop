import { getToken } from './AuthAPI';
import RequestError from './RequestError';
import { API_URL } from './utils';

export const getProject = async (teamID, projectID) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(
        API_URL + `/api/team/${teamID}/project/${projectID}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    if (!response.ok) throw await RequestError.parseResponse(response);

    const project = await response.json();
    return project;
};

export const getTeamAndProjects = async () => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + '/api/project', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) throw await RequestError.parseResponse(response);

    const projects = await response.json();
    return projects;
};

export const createProject = async (name, teamID) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + `/api/team/${teamID}/project`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name }),
    });

    if (!response.ok) throw await RequestError.parseResponse(response);

    const { project } = await response.json();
    return project;
};

export const updateProjectName = async (teamID, projectID, name) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(
        API_URL + `/api/team/${teamID}/project/${projectID}/name`,
        {
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ name }),
        },
    );

    if (!response.ok) throw await RequestError.parseResponse(response);
};
