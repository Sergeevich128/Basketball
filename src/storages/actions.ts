import {BET_SELECTED, DEFAULT_STAKE, DEVICE_TYPE, INPUT_DEFAULT_STAKE, REMOTE_BET, SELECT_TAB} from "./constants";
import {IBet} from "./betsReducer";
import {IDeviceInfo} from "./deviceInfo";

export const addBet = (bet: IBet) => ({
    type: BET_SELECTED,
    bet,
});

export const changeStake = (defaultStake: number) => ({
    type: DEFAULT_STAKE,
    defaultStake
});

export const changeInputStake = (inputDefaultStake: number, id: number) => ({
    type: INPUT_DEFAULT_STAKE,
    inputDefaultStake,
    id
});

export const removeSelectedBet = (betId: number) => ({
    type: REMOTE_BET,
    betId
});

export const sendDeviceInfo = (info: IDeviceInfo) => ({
    type: DEVICE_TYPE,
    info
});

export const selectTab = (id: number) => ({
    type: SELECT_TAB,
    id
});