import {
  BET_SELECTED,
  DEFAULT_STAKE,
  INPUT_DEFAULT_STAKE,
  INPUT_FAST_STAKE,
  REMOTE_BET,
  REMOTE_LAST_NUM,
} from "../../storages/constants";

export interface ISelectedBet {
  id: number;
  name: string;
  odd: number;
  value: number;
  subgroupName: string;
  groupName: string;
}

export interface IStateBetSlip {
  selectedBets: ISelectedBet[];
  defaultStake: number;
  fastStakesValue: number[];
}

const initialState = {
  selectedBets: [],
  defaultStake: 10,
  fastStakesValue: [0.20, 0.5, 1, 5, 10],
  canConfirmStake: false
};

const betSlip = (state: IStateBetSlip = initialState, action: any) => {
  let selectedBet = state.selectedBets.find((bet) => bet.id === action.id);
  switch (action.type) {
    case BET_SELECTED:
      action.bet.value = state.defaultStake;
      if (action.bet.selected === true) {
        action.bet.selected = false;
        const index = state.selectedBets.indexOf(action.bet)
        state.selectedBets.splice(index, 1)
      } else {
        action.bet.selected = true;
        state.selectedBets.push(action.bet)
      }
      return {...state};
    case DEFAULT_STAKE:
      const newBets = state.selectedBets.map((selectedBet: ISelectedBet) => {
        selectedBet.value = action.defaultStake;
        return selectedBet
      })
      return {...state, defaultStake: action.defaultStake, selectedBets: newBets};
    case INPUT_DEFAULT_STAKE:
      if (selectedBet) {
        (window.innerWidth < 993) ? selectedBet.value = selectedBet.value >0 ? selectedBet.value + action.inputDefaultStake.toString() :
          action.inputDefaultStake.toString() :
          selectedBet.value = action.inputDefaultStake
      }
      return {...state};
    case INPUT_FAST_STAKE:
      if (selectedBet) selectedBet.value = action.inputDefaultStake;
      return {...state};
    case REMOTE_LAST_NUM:
      if (selectedBet) {
        let valueStr = selectedBet.value.toString();
        selectedBet.value = +(valueStr.substring(0, valueStr.length - 1))
      }
      return {...state};
    case REMOTE_BET:
      const index = state.selectedBets.findIndex((bet) => bet.id === action.betId)
      if (index > -1) {
        state.selectedBets.splice(index, 1);
      }
      return {...state}
  }
  return state;
}

export default betSlip;