export const TEAMS_ACTIONS = {
    ADD: 0,
    DELETE: 1,
    LOAD: 2,
    ADD_PROJECT: 3,
    DELETE_PROJECT: 4,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case TEAMS_ACTIONS.LOAD:
            return action.payload;
        case TEAMS_ACTIONS.ADD:
            if (state) state.unshift(action.payload);
            return state;
        case TEAMS_ACTIONS.DELETE:
            return deleteTeam(state, action.payload);
        case TEAMS_ACTIONS.ADD_PROJECT:
            return addProject(state, action.payload);
        case TEAMS_ACTIONS.DELETE_PROJECT:
            return deleteProject(state, action.payload);
        default:
            throw new Error('Illegal Teams Action');
    }
};

const deleteTeam = (state, teamID) => {
    if (!state) return;

    const newState = [...state];
    const index = newState.findIndex((team) => team.teamID === teamID);
    newState.splice(index, 1);
    return newState;
};

const addProject = (teams, project) => {
    if (!teams) return;
    const teamIndex = teams.findIndex((team) => team.teamID === project.teamID);

    if (teamIndex > -1 && teams[teamIndex].projects) {
        teams[teamIndex].projects.unshift(project);
    }

    return teams;
};

const deleteProject = (teams, project) => {
    if (!teams) return;
    const teamIndex = teams.findIndex((team) => team.teamID === project.teamID);

    if (teamIndex > -1 && teams[teamIndex].projects) {
        teams[teamIndex].projects = teams[teamIndex].projects.filter(
            (teamProject) => teamProject.projectID !== project.projectID,
        );
    }

    return teams;
};
