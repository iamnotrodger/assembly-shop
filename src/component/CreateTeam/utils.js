export const validateTeamName = (name) => {
    let valid = true;
    let error = '';

    if (!name) {
        valid = false;
        error = 'Team name is required';
    } else if (name.length > 100) {
        valid = false;
        error = "Team name can't be longer than 100 characters";
    } else if (name.match(/[@#$%^&*()+={};"\\|,<>/]/)) {
        valid = false;
        error = 'Special characters are not allowed';
    }

    return { valid, error };
};
