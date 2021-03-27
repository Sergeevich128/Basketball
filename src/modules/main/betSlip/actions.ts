import {
  CHANGE_DEFAULT_STAKE,
  CHANGE_INPUT_STAKE, CHANGE_TOTAL_BET,
  REMOVE_BET,
  SELECT_TAB, SET_BET_ERROR
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