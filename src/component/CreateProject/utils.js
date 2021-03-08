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
