import {
  DEFAULT_STAKE,
  INPUT_DEFAULT_STAKE,
  INPUT_FAST_STAKE,
  REMOTE_BET,
  REMOTE_LAST_NUM,
  SELECT_TAB
} from "../../storages/constants";

export const changeDefaultStake = (defaultStake: number) => ({
  type: DEFAULT_STAKE,
  defaultStake
});

export const changeInputStake = (inputDefaultStake: any, id: number) => ({
  type: INPUT_DEFAULT_STAKE,
  inputDefaultStake,
  id
});

export const changeFastStake = (inputDefaultStake: any, id: number) => ({
  type: INPUT_FAST_STAKE,
  inputDefaultStake,
  id
});

export const removeSelectedBet = (betId: number) => ({
  type: REMOTE_BET,
  betId
});

export const removeLastNum = (betId: number) => ({
  type: REMOTE_LAST_NUM,
  betId
});

export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  id
});