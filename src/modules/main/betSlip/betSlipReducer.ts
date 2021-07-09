import {
    SELECT_BET,
    CHANGE_DEFAULT_STAKE,
    CHANGE_INPUT_STAKE,
    REMOVE_BET,
    SET_BET_ERROR,
    CHANGE_TOTAL_BET,
    SEND_BETS_DATA,
    SET_EVENT_ID,
    REMOVE_PREVIEW_DATA,
    SET_PREVIEW_DATA,
    SET_RUN_DATA, CLEAR_SELECTED_BETS,
} from "../../../storages/constants";
import RequestModel from "../../../models/RequestModel";
import store from "../../../storages/store";
import {switchWindow} from "../actions";

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
    eventId: number;
}

export interface betGroupsLeftOrder {
    [index: number]: HTMLElement;
}

export let eventId: number = 0;

const initialState = {
    selectedBets: [],
    defaultStake: 10,
    fastStakesValue: [0.20, 0.5, 1, 5, 10],
    totalBet: 0,
    defaultStakeErrorType: "",
    betGroupsLeftOrder: [],
    eventId
};

const getTotalBet = (state: IStateBetSlip): number => {
    return state.selectedBets.reduce((acc: number, selectedBet: ISelectedBet) => acc + +selectedBet.value, 0);
}

const betSlipReducer = (state: IStateBetSlip = initialState, action: any) => {
    let selectedBet = state.selectedBets.find((bet) => bet.id === action.id);

    switch (action.type) {

        case SELECT_BET:
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
        case SET_EVENT_ID:
            eventId = action.id
            return {...state, eventId: action.id}
        case CLEAR_SELECTED_BETS:
            return {...state, selectedBets: []}
        case SEND_BETS_DATA:
            RequestModel.getPlacedBets({
                eventId: eventId,
                betsData: JSON.stringify(
                    state.selectedBets.map((bet) => ({
                        betTypeId: bet.id,
                        amount: bet.value,
                        odd: bet.odd
                    }))
                )
            })
                .then((data: any) => {
                    // store.dispatch({type: "SET_PLACED_BETS_DATA", data: data.data})
                    store.dispatch({type: SET_RUN_DATA, data: data.data})
                })
                .then(() => store.dispatch(switchWindow("Run")));
    }
    return state;
}

export default betSlipReducer;
