import {REQUIRE_RESULT_DATA, SET_RESULTS_DATA} from "../../../storages/constants";
import RequestModel from "../../../models/RequestModel";
import {eventId} from "../betSlip/betSlipReducer";
import store from "../../../storages/store";

export interface IWinBetsState {
    winBets: { [key:number]: IWinBet };
    activeTeams: IActiveTeams;
    detailScores: IDetailScores;
    totalScore: Array<number>
}

export interface IWinBet {
    amount: Object,
    betId: number,
    betTypeId: number,
    odd: number,
    betName: Object,
    potential: Object,
    status: string,
    statusId: number
}

export interface IDetailScores {
    [index: number]: [number, number]
}

export interface IActiveTeams {
    [index: number]: number;
}

const initialState = {
    winBets: {},
    activeTeams: [],
    detailScores: [],
    totalScore: []
}

const winBetsReducer = (state: IWinBetsState = initialState, action: any) => {
    switch (action.type) {
        case SET_RESULTS_DATA:
            console.log(action.data)
            return {...state, winBets: action.data.winBets.bets}
    }
    return state
}

export default winBetsReducer;