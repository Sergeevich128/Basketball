import {SET_TEAMS, SET_ACTIVE_TEAMS, SET_STATISTICS, SET_EVENT_ID} from "../../../storages/constants";

export const setTeamsData = (data: Object) => ({
  type: SET_TEAMS,
  data
})

export const setActiveTeams = (teams: Object) => ({
  type: SET_ACTIVE_TEAMS,
  teams
})

export const setStatistics = (statistics: Object) => ({
  type: SET_STATISTICS,
  statistics
})