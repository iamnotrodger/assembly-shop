export const validateTitle = (name) => {
    let valid = true;
    let error = '';

    if (!name) {
        valid = false;
        error = 'Team name is required';
    }

    return { valid, error };
};
