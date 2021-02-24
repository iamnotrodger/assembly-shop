const API_URL = process.env.REACT_APP_API_URL;

export const getProfile = async (accessToken) => {
    if (!accessToken) throw new Error('Unauthorized');

    const response = await fetch(API_URL + '/api/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Unable to get user profile.');
    }

    const user = await response.json();
    return user;
};
