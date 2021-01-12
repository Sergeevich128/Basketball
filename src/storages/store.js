import {createStore, combineReducers} from "redux";
import betsReducer from "../modules/main/bets/betsReducer";
import betSlip from "../modules/main/selectedBets/betSlip";
import deviceInfo from "../modules/main/bets/deviceInfo";
import teamsInfo from "../modules/main/headerOfTeams/teamsInfo";

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






