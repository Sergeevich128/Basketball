import {createStore, combineReducers} from "redux";
import betsReducer from "./betsReducer";
import selectedBets from "./selectedBets";

let reducers = combineReducers({
    selectedBets,
    bets: betsReducer,
})

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());

window.store = store

export default store;






