import {PRESS_PREV, PRESS_NEXT, SET_TEAMS, SET_ACTIVE_TEAMS, SET_STATISTICS} from "../../../storages/constants";

export const pressPrevBtn = () => ({
  type: PRESS_PREV
});

export const pressNextBtn = () => ({
  type: PRESS_NEXT
});

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