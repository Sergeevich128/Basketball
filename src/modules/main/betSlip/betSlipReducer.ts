import {
  SELECT_BET,
  CHANGE_DEFAULT_STAKE,
  CHANGE_INPUT_STAKE,
  REMOVE_BET, SET_BET_ERROR, CHANGE_TOTAL_BET,
} from "../../../storages/constants";

export interface ISelectedBet {
  id: number;
  name: string;
  odd: number;
  value: number;
  errorType: string;
  toHide: boolean;
}

export interface IStateBetSlip {
  selectedBets: ISelectedBet[];
  defaultStake: number;
  fastStakesValue: number[];
  totalBet: number;
  defaultStakeErrorType: string;
}

const initialState = {
  selectedBets: [],
  defaultStake: 10,
  fastStakesValue: [0.20, 0.5, 1, 5, 10],
  totalBet: 0,
  defaultStakeErrorType: ""
};

const getTotalBet = (state: IStateBetSlip): number => {
  return state.selectedBets.reduce((acc: number, selectedBet: ISelectedBet) => acc + +selectedBet.value, 0);
}

const betSlipReducer = (state: IStateBetSlip = initialState, action: any) => {
  let selectedBet = state.selectedBets.find((bet) => bet.id === action.id);

  switch (action.type) {

    case SELECT_BET:
      // if (action.bet.selected) {
      //   action.bet.selected = false;
      //   if (selectedBet) selectedBet.toHide = true;
      // } else  {
      //   action.bet.selected = true;
      //   if (selectedBet) selectedBet.toHide = false;
      // }

      action.bet.value = state.defaultStake;
      if (action.bet.selected === true) {
        const selectedBet = state.selectedBets.find((selectedBet) => selectedBet === action.bet)
        if (selectedBet) selectedBet.toHide = true;
      } else {
        state.selectedBets.push(action.bet)
        const selectedBet = state.selectedBets.find((selectedBet) => selectedBet === action.bet)
        if (selectedBet) selectedBet.toHide = false;
      }
      state.totalBet = +getTotalBet(state);

      return {...state};

    case CHANGE_DEFAULT_STAKE:
      const newBets = state.selectedBets.map((selectedBet: ISelectedBet) => {
        selectedBet.value = action.defaultStake;
        state.totalBet = +getTotalBet(state)
        return selectedBet
      })
      return {...state, defaultStake: action.defaultStake, selectedBets: newBets};

    case CHANGE_INPUT_STAKE:
      if (selectedBet) selectedBet.value = action.inputStake;
      state.totalBet = +getTotalBet(state)
      return {...state};

    case REMOVE_BET:
      if (action.id === -1) {
        state.selectedBets.splice(0, state.selectedBets.length);
      }

      if (selectedBet && selectedBet.toHide) {
        const index = state.selectedBets.findIndex((bet) => bet.id === action.id)
        if (index > -1) {
          state.selectedBets.splice(index, 1);
        }
      }
      selectedBet && (selectedBet.toHide = true)
      state.totalBet = +getTotalBet(state)
      return {...state}

    case CHANGE_TOTAL_BET:
      state.totalBet = +action.totalBet
      return {...state}

    case SET_BET_ERROR:
      if (selectedBet) {
        selectedBet.errorType = action.errorType
      } else if (action.id === "default") {
              state.defaultStakeErrorType = action.errorType
      }
      return {...state}
  }
  return state;
}

export default betSlipReducer;