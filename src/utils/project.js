export const addProject = (teams, project) => {
    const teamIndex = teams.findIndex((team) => team.teamID === project.teamID);

    if (teamIndex > -1 && teams[teamIndex].projects) {
        teams[teamIndex].projects.unshift(project);
    }

    return teams;
};

export const removeProject = (teams, project) => {
    const teamIndex = teams.findIndex((team) => team.teamID === project.teamID);

    if (teamIndex > -1 && teams[teamIndex].projects) {
        teams[teamIndex].projects = teams[teamIndex].projects.filter(
            (teamProject) => teamProject.projectID !== project.projectID,
        );
    }

    return teams;
};
