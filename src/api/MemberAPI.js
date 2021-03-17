import { getToken } from './AuthAPI';
import RequestError from './RequestError';
import { API_URL } from './utils';

export const getTeamMembers = async (teamID) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + `/api/member/team/${teamID}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) throw await RequestError.parseResponse(response);

    const members = await response.json();
    return members;
};

export const getProjectMembers = async (projectID) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + `/api/member/project/${projectID}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) throw await RequestError.parseResponse(response);

    const members = await response.json();
    return members;
};

export const addTeamMember = async (userID, teamID) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(
        API_URL + `/api/member/${userID}/team/${teamID}`,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    if (!response.ok) throw await RequestError.parseResponse(response);
};

export const deleteTeamMember = async (userID, teamID) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(
        API_URL + `/api/member/${userID}/team/${teamID}`,
        {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

    if (!response.ok) throw await RequestError.parseResponse(response);
};
