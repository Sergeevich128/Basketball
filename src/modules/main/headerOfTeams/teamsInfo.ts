import {
    SET_TEAMS,
    SET_ACTIVE_TEAMS,
    SET_STATISTICS, SET_EVENT_ID
} from "../../../storages/constants";

export interface ITeams {
    [key: number]: ITeam
}

export interface ITeam {
    id: number;
    name: string;
    fullName: string;
    shortName: string;
    strength: number;
    bgColor: string;
}

export interface IActiveTeams {
    [index: number]: number
}

export interface IAdvancedStatistics {
    [index: number]: IAdvancedStatistic;
}

export interface IAdvancedStatistic {
    "U/O": string;
    ats: string;
    avgFullScore: string;
    avgHalfScore: string;
    avgMargin: string;
}

export interface ILastResults {
    [index: number]: ILastResult;
}

export interface ILastResult {
    0: number;
    1: number;
}

export interface ITeamsState {
    teams: ITeams;
    activeTeams: IActiveTeams;
    lastResults: ILastResults;
    advancedStatistics: IAdvancedStatistics;
    // eventId: number;
}

const teamColors = {
    1: "#1E46CA",
    2: "#702A67",
    3: "#B70A11",
    4: "#E2231A",
    5: "#EEBF1A",
    6: "#E9D100",
    7: "#E51636",
    8: "#00793F",
    9: "#222425",
    10: "#142036",
    11: "#4E9E47",
    12: "#1D4745",
    13: "#2E296B",
}

let activeTeams: IActiveTeams = [];

let teams: ITeams = {};

let lastResults: ILastResults = [];

let advancedStatistics: IAdvancedStatistics = [];

// let eventId: number = 0;


const initialState = {
    teams,
    activeTeams,
    lastResults,
    advancedStatistics,
    // eventId
}

const teamsInfo = (state: ITeamsState = initialState, action: any) => {

    switch (action.type) {
        case SET_TEAMS:
            teams = action.data;
            Object.values(teams).forEach((team: ITeam) => {
                // @ts-ignore
                team.bgColor = teamColors[`${team.id}`]
            })
            return {...state, teams: action.data}
        case SET_ACTIVE_TEAMS:
            // activeTeams = [action.teams[0].id, action.teams[1].id]
            return {...state, activeTeams: [action.teams[0].id, action.teams[1].id]}
        case SET_STATISTICS:
            lastResults = action.statistics.lastResults;
            advancedStatistics = action.statistics.advanced;
            return {
                ...state,
                lastResults: action.statistics.lastResults,
                advancedStatistics: action.statistics.advanced
            }
        // case SET_EVENT_ID:
        //     return {...state, eventId: action.id}
    }
    return state;
}

export default teamsInfo;
