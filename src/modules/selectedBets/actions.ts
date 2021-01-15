import {DEFAULT_STAKE, INPUT_DEFAULT_STAKE, REMOTE_BET, SELECT_TAB} from "../../storages/constants";

export const changeStake = (defaultStake: number) => ({
  type: DEFAULT_STAKE,
  defaultStake
});

export const changeInputStake = (inputDefaultStake: number, id: number) => ({
  type: INPUT_DEFAULT_STAKE,
  inputDefaultStake,
  id
});

export const removeSelectedBet = (betId: number) => ({
  type: REMOTE_BET,
  betId
});

export const selectTab = (id: number) => ({
  type: SELECT_TAB,
  id
});