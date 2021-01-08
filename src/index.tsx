import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./storages/store";
import {IBetsState, IGroup} from "./storages/betsReducer";
import {IStateBetSlip} from "./storages/betSlip";
import {IDeviceInfo} from "./storages/deviceInfo";
import {ITeamsState} from "./storages/teamsInfo";

export interface IStore {
    bets: IBetsState;
    betsGroup: IGroup;
    betSlip: IStateBetSlip;
    deviceInfo: IDeviceInfo;
    teamsInfo: ITeamsState;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
