import {BET_SELECTED, DEFAULT_STAKE, INPUT_DEFAULT_STAKE, REMOTE_BET} from "../../../storages/constants";

export interface ISelectedBet {
  id: number;
  name: string;
  odd: number;
  value: number;
}

export interface IStateBetSlip {
  selectedBets: ISelectedBet[];
  defaultStake: number;
}

const initialState = {
  selectedBets: [],
  defaultStake: 123,
};

const betSlip = (state: IStateBetSlip = initialState, action: any) => {
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
      return {...state, defaultStake: action.defaultStake};
    case INPUT_DEFAULT_STAKE:
      let selectedBet = state.selectedBets.find((bet) => bet.id === action.id);
      if (selectedBet) selectedBet.value = action.inputDefaultStake;
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