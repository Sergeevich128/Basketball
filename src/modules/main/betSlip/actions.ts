import {
  CHANGE_DEFAULT_STAKE,
  CHANGE_INPUT_STAKE, CHANGE_TOTAL_BET, CLEAR_SELECTED_BETS,
  REMOVE_BET, REMOVE_PREVIEW_DATA,
  SELECT_TAB, SEND_BETS_DATA, SET_BET_ERROR, SET_EVENT_ID
} from "../../../storages/constants";

export const changeDefaultStake = (defaultStake: string) => ({
  type: CHANGE_DEFAULT_STAKE,
  defaultStake
});

export const changeInputStake = (inputStake: string , id: number) => ({
  type: CHANGE_INPUT_STAKE,
  inputStake,
  id
});

export const removeSelectedBet = (id: number) => ({
  type: REMOVE_BET,
  id
});

export const selectTab = (name: string) => ({
  type: SELECT_TAB,
  name
});

export const setBetError = (errorType: string, id: number | string) => ({
  type: SET_BET_ERROR,
  errorType,
  id
})

export const changeTotalBet = (totalBet: number) => ({
  type: CHANGE_TOTAL_BET,
  totalBet
})

export const sendBetsData = () => ({
  type: SEND_BETS_DATA
})

export const setEventId = (id: number) => ({
  type: SET_EVENT_ID,
  id
})

export const removePreviewData = () => ({
  type: REMOVE_PREVIEW_DATA
})


export const clearSelectedBets = () => ({
  type: CLEAR_SELECTED_BETS
})