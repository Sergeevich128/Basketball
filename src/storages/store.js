import {createStore, combineReducers} from "redux";
import betsReducer from "./betsReducer";
import betSlip from "./betSlip";
import deviceInfo from "./deviceInfo";
import teamsInfo from "./teamsInfo";

let reducers = combineReducers({
    betSlip,
    bets: betsReducer,
    deviceInfo,
    teamsInfo
})

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());

window.store = store

export default store;






