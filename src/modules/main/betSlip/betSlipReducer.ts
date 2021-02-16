import {
  SELECT_BET,
  CHANGE_DEFAULT_STAKE,
  CHANGE_INPUT_STAKE,
  CHANGE_INPUT_STAKE_WITH_FAST_STAKE,
  REMOVE_BET,
  REMOVE_LAST_NUM,
} from "../../../storages/constants";

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

const betSlipReducer = (state: IStateBetSlip = initialState, action: any) => {
  let selectedBet = state.selectedBets.find((bet) => bet.id === action.id);
  switch (action.type) {
    case SELECT_BET:
      action.bet.value = state.defaultStake;
      if (action.bet.selected === true) {
        const index = state.selectedBets.indexOf(action.bet)
        state.selectedBets.splice(index, 1)
      } else {
        state.selectedBets.push(action.bet)
      }
      return {...state};
    case CHANGE_DEFAULT_STAKE:
      const newBets = state.selectedBets.map((selectedBet: ISelectedBet) => {
        selectedBet.value = action.defaultStake;
        return selectedBet
      })
      return {...state, defaultStake: action.defaultStake, selectedBets: newBets};
    case CHANGE_INPUT_STAKE:
      if (selectedBet) {
        (window.innerWidth < 993) ? selectedBet.value = selectedBet.value >0 ? selectedBet.value + action.inputStake.toString() :
          action.inputStake.toString() :
          selectedBet.value = action.inputStake
      }
      return {...state};
    case CHANGE_INPUT_STAKE_WITH_FAST_STAKE:
      if (selectedBet) selectedBet.value = action.inputDefaultStake;
      return {...state};
    case REMOVE_LAST_NUM:
      if (selectedBet) {
        let valueStr = selectedBet.value.toString();
        selectedBet.value = +(valueStr.substring(0, valueStr.length - 1))
      }
      return {...state};
    case REMOVE_BET:
      const index = state.selectedBets.findIndex((bet) => bet.id === action.id)
      if (index > -1) {
        state.selectedBets.splice(index, 1);
      }
      // if (selectedBet && selectedBet.id > -1) {
      //   state.selectedBets.splice(state.selectedBets.findIndex(() => selectedBet?.id === action.id), 1);
      // }

      return {...state}
  }
  return state;
}

export default betSlipReducer;