import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./storages/store";
import {IGroup} from "./storages/betsReducer";

export interface IStore {
  bets: IGroup[];
  selectedBets: any
}

ReactDOM.render(
  // @ts-ignore
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
