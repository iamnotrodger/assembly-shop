export const validateProjectName = (name) => {
    let error = null;

    if (!name) {
        error = 'Project name is required';
    } else if (name.length > 100) {
        error = "Project name can't be longer than 100 characters";
    } else if (name.match(/[@#$%^&*()+={};"\\|,<>/]/)) {
        error = 'Special characters are not allowed';
    }

    return error;
};

export const validateTaskTitle = (name) => {
    let error = null;

    if (!name) {
        error = 'Task title is required';
    }

    return error;
};

export const validateTeamName = (name) => {
    let error = null;

    if (!name) {
        error = 'Team name is required';
    } else if (name.length > 100) {
        error = "Team name can't be longer than 100 characters";
    } else if (name.match(/[@#$%^&*()+={};"\\|,<>/]/)) {
        error = 'Special characters are not allowed';
    }

    return error;
};
