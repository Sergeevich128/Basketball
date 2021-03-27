import {SET_USER_BALANCE} from "../../storages/constants";

export const setUserBalance = (balance: Object, currency: Object) => ({
    type: SET_USER_BALANCE,
    balance,
    currency
})