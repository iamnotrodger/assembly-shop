export const validateProjectName = (name) => {
    let valid = true;
    let error = '';

    if (!name) {
        valid = false;
        error = 'Project name is required';
    } else if (name.length > 100) {
        valid = false;
        error = "Project name can't be longer than 100 characters";
    } else if (name.match(/[@#$%^&*()+={};"\\|,<>/]/)) {
        valid = false;
        error = 'Special characters are not allowed';
    }

    return { valid, error };
};

export const validateTaskTitle = (name) => {
    let valid = true;
    let error = '';

    if (!name) {
        valid = false;
        error = 'Task title is required';
    }

    return { valid, error };
};

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
