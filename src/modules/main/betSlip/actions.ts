import {
  CHANGE_DEFAULT_STAKE,
  CHANGE_INPUT_STAKE,
  CHANGE_INPUT_STAKE_WITH_FAST_STAKE,
  REMOVE_BET,
  REMOVE_LAST_NUM,
  SELECT_TAB
} from "../../../storages/constants";

export const changeDefaultStake = (defaultStake: number) => ({
  type: CHANGE_DEFAULT_STAKE,
  defaultStake
});

export const changeInputStake = (inputStake: any, id: number) => ({
  type: CHANGE_INPUT_STAKE,
  inputStake,
  id
});

export const changeFastStake = (inputDefaultStake: any, id: number) => ({
  type: CHANGE_INPUT_STAKE_WITH_FAST_STAKE,
  inputDefaultStake,
  id
});

export const removeSelectedBet = (id: number) => ({
  type: REMOVE_BET,
  id
});

export const removeLastNum = (id: number) => ({
  type: REMOVE_LAST_NUM,
  id
});

export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  id
});