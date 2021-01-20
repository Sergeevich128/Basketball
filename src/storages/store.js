import {createStore, combineReducers} from "redux";
import betsReducer from "../modules/bets/betsReducer";
import betSlip from "../modules/selectedBets/betSlip";
import deviceInfo from "../modules/bets/deviceInfo";
import teamsInfo from "../modules/main/headerOfTeams/teamsInfo";
import userBalance from "../modules/header/balance/userBalance";

let reducers = combineReducers({
  betSlip,
  bets: betsReducer,
  deviceInfo,
  teamsInfo,
  userBalance
})

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;






