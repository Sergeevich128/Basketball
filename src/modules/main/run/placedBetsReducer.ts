import {
    REQUIRE_RESULT_DATA,
    SET_PLACED_BETS_DATA,
    SET_RESULT_DATA,
    SET_RESULTS_DATA,
} from "../../../storages/constants";
import RequestModel from "../../../models/RequestModel";
import {eventId} from "../betSlip/betSlipReducer";
import store from "../../../storages/store";
import {switchWindow} from "../actions";

export interface IPlacedBetsState {
    activeTeams: IActiveTeams;
    placedBets: IPlacedBet[];
}

export interface IActiveTeams {
    [index: number]: number;
}

export interface IPlacedBet {
    amount: Object,
    betId: number,
    betTypeId: number,
    betName: Object,
    odd: number,
    potential: Object
}

const initialState = {
    activeTeams: [],
    placedBets: []
}

const placedBetsReducer = (state: IPlacedBetsState = initialState, action: any) => {
    switch (action.type) {
        case SET_PLACED_BETS_DATA:
            state.placedBets = action.data.placedBets
            return {...state, activeTeams: action.data.assets, placedBets: action.data.placedBets}
        // case REQUIRE_RESULT_DATA:
        //     RequestModel.getGameResults(eventId)
        //         .then((data) => {
        //             // store.dispatch({type: SET_RESULTS_DATA, data: data.data});
        //             store.dispatch({type: SET_RESULT_DATA, data: data.data});
        //         })
        //         .then(() => store.dispatch(switchWindow("Result")))
        //     return {...state}
    }
    return state;
}

export default placedBetsReducer;