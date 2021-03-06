export const TEAMS_ACTIONS = {
    ADD: 0,
    DELETE: 1,
    LOAD: 2,
    UPDATE_NAME: 3,
    ADD_PROJECT: 4,
    DELETE_PROJECT: 5,
};

export const USER_TEAMS_ACTIONS = {
    ADD: 0,
    DELETE: 1,
    LOAD: 2,
    UPDATE_NAME: 3,
};

export const teamsReducer = (state, action) => {
    switch (action.type) {
        case TEAMS_ACTIONS.LOAD:
            return action.payload;
        case TEAMS_ACTIONS.ADD:
            if (state) state.unshift(action.payload);
            return state;
        case TEAMS_ACTIONS.DELETE:
            return deleteTeam(state, action.payload);
        case TEAMS_ACTIONS.UPDATE_NAME:
            return updateName(state, action.payload);
        case TEAMS_ACTIONS.ADD_PROJECT:
            return addProject(state, action.payload);
        case TEAMS_ACTIONS.DELETE_PROJECT:
            return deleteProject(state, action.payload);
        default:
            throw new Error('Illegal Teams Action');
    }
};

export const userTeamsReducer = (state, action) => {
    switch (action.type) {
        case USER_TEAMS_ACTIONS.ADD:
            if (state) state.push(action.payload);
            return state;
        case USER_TEAMS_ACTIONS.DELETE:
            return deleteTeam(state, action.payload);
        case USER_TEAMS_ACTIONS.LOAD:
            return action.payload;
        case USER_TEAMS_ACTIONS.UPDATE_NAME:
            return updateName(state, action.payload);
        default:
            throw new Error('Illegal User Teams Action');
    }
};

const deleteTeam = (teams, teamID) => {
    if (!teams) return;

    // eslint-disable-next-line eqeqeq
    const index = teams.findIndex((team) => team.teamID == teamID);
    if (index > -1) teams.splice(index, 1);
    return teams;
};

const updateName = (teams, team) => {
    if (!teams) return;
    const { teamID, name } = team;

    // eslint-disable-next-line eqeqeq
    const index = teams.findIndex((team) => team.teamID == teamID);
    if (index > -1) {
        teams[index].name = name;
    }

    return teams;
};

const addProject = (teams, project) => {
    if (!teams) return;
    const teamIndex = teams.findIndex((team) => team.teamID === project.teamID);

    if (teamIndex > -1) {
        if (teams[teamIndex].projects) {
            teams[teamIndex].projects.unshift(project);
        } else {
            teams[teamIndex].projects = [project];
        }
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
