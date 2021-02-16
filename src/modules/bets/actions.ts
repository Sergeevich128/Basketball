import {SELECT_BET, CHANGE_VALUE_OF_SELECTED_FIELD, DEVICE_TYPE} from "../../storages/constants";
import {IDeviceInfo} from "./deviceInfo";
import {IBet} from "./betsReducer";

export const sendDeviceInfo = (info: IDeviceInfo) => ({
  type: DEVICE_TYPE,
  info
});

export const addBet = (bet: IBet) => ({
  type: SELECT_BET,
  bet,
});

export const changeValueOfSelectedField = (id: number) => ({
  type: CHANGE_VALUE_OF_SELECTED_FIELD,
  id,
});