import {BET_SELECTED, DEVICE_TYPE} from "../../storages/constants";
import {IDeviceInfo} from "./deviceInfo";
import {IBet} from "./betsReducer";

export const sendDeviceInfo = (info: IDeviceInfo) => ({
  type: DEVICE_TYPE,
  info
});

export const addBet = (bet: IBet) => ({
  type: BET_SELECTED,
  bet,
});