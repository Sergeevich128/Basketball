import {
    REMOVE_PREVIEW_DATA, REMOVE_RESULT_DATA, REMOVE_RUN_DATA,
    REQUIRE_RESULT_DATA,
    SET_PREVIEW_DATA,
    SET_RESULT_DATA,
    SET_RUN_DATA
} from "../../storages/constants";
import {
    IEventBets,
    IEventStatistics,
    IEventStatus,
    IEventUser, IEventWinBetsContainer, TDetailScores,
    TEventAssets,
    TEventTotalScore, TPlacedBets
} from "./types/EventTypes";
import RequestModel from "../../models/RequestModel";
import {eventId} from "./betSlip/betSlipReducer";
import store from "../../storages/store";
import {switchWindow} from "./actions";

export interface IPreviewData {
    id: number;
    status: IEventStatus;
    assets: TEventAssets;
    statistics: IEventStatistics;
    bets: IEventBets;
    user: IEventUser;
}

export interface IRunData {
    id: number,
    status: IEventStatus;
    assets: TEventAssets;
    startAt: string;
    totalScore: TEventTotalScore;
    detailScores: TDetailScores;
    placedBets: TPlacedBets;
}

export interface IResultData {
    id: number;
    status: IEventStatus;
    assets: TEventAssets;
    startAt: string;
    finishedAt: string;
    totalScore: TEventTotalScore;
    detailScores: TDetailScores;
    winBets: IEventWinBetsContainer;
    user: IEventUser;
}

export interface IMainState {
    previewData?: IPreviewData;
    runData?: IRunData;
    resultData?: IResultData;
    winMatch: boolean;
}

const initialState = {
    previewData: undefined,
    runData: undefined,
    resultData: undefined,
    winMatch: false
}

const mainReducer = (state: IMainState = initialState, action: any) => {
    switch (action.type) {
        case SET_PREVIEW_DATA:
            return {...state, winMatch: false, previewData: action.data}
        case SET_RUN_DATA:
            return {...state, runData: action.data}
        case SET_RESULT_DATA:
            return {...state, resultData: action.data, winMatch: !(action.data.winBets.bets.length === 0)}
        case REMOVE_PREVIEW_DATA:
            return {...state, previewData: undefined}
        case REMOVE_RUN_DATA:
            return {...state, runData: undefined}
        case REMOVE_RESULT_DATA:
            return {...state, resultData: undefined}
        case REQUIRE_RESULT_DATA:
            RequestModel.getGameResults(eventId)
                .then((data) => {
                    // store.dispatch({type: SET_RESULTS_DATA, data: data.data});
                    store.dispatch({type: SET_RESULT_DATA, data: data.data});
                })
                .then(() => store.dispatch(switchWindow("Result")))
            return {...state}

    }
    return state
}

export default mainReducer;