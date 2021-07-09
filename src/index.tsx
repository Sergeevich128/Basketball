import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./storages/store";
import {IBetsState, IGroup} from "./modules/bets/betsReducer";
import {IStateBetSlip} from "./modules/main/betSlip/betSlipReducer";
import {IDeviceInfo} from "./modules/bets/deviceInfo";
import {ITeamsState} from "./modules/main/headerOfTeams/teamsInfo";
import {IBalance} from "./modules/header/balance/userBalance";
import {IPlacedBetsState} from "./modules/main/run/placedBetsReducer";
import {IActiveWindowReducer} from "./modules/main/activeWiindowReducer";
import {IWinBetsState} from "./modules/main/results/winBetsReducer";
import {IMainState} from "./modules/main/mainReducer";

export interface IStore {
  bets: IBetsState;
  betsGroup: IGroup;
  betSlip: IStateBetSlip;
  deviceInfo: IDeviceInfo;
  teamsInfo: ITeamsState;
  userBalance: IBalance;
  placedBetsReducer: IPlacedBetsState;
  activeWindowReducer: IActiveWindowReducer;
  winBetsReducer: IWinBetsState;
  mainReducer: IMainState;
}

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
