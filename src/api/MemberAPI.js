import { getToken } from './AuthAPI';
import RequestError from './RequestError';

const API_URL = process.env.REACT_APP_API_URL;

export const getMembers = async (teamID) => {
    const accessToken = await getToken();
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + `/api/team/${teamID}/member`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw await RequestError.parseResponse(response);
    }

    const members = await response.json();
    return members;
};
