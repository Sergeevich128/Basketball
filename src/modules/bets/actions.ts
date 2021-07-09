import {
  SELECT_BET,
  CHANGE_BET_SELECTED,
  DEVICE_TYPE,
  DISABLE_BET,
  SET_BETS,
  SET_BETS_TEMPLATE
} from "../../storages/constants";
import {IDeviceInfo} from "./deviceInfo";
import {IBet} from "./betsReducer";

export const sendDeviceInfo = (info: IDeviceInfo) => ({
  type: DEVICE_TYPE,
  info
})

export const addBet = (bet: IBet) => ({
  type: SELECT_BET,
  bet,
})

export const disableBet = (id: number, disabled: boolean) => ({
  type: DISABLE_BET,
  id,
  disabled
})

export const changeBetSelected = (id: number) => ({
  type: CHANGE_BET_SELECTED,
  id,
})

export const setBetsTemplate = (betsTemplate: Object) => ({
  type: SET_BETS_TEMPLATE,
  betsTemplate,
})

// export const setBetGroupsLeftOrder = (element: HTMLElement) => ({
//   type: SET_BET_GROUPS_LEFT_ORDER,
//   element,
// })

export const setBets = (bets: Object) => ({
  type: SET_BETS,
  bets,
})

