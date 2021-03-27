import {SET_USER_BALANCE} from "../../../storages/constants";

export interface IBalance {
  value: string;
  currency: string;
  code: string;
  name: string;
}

const balance: IBalance = {
  value: "",
  currency: "",
  code: "",
  name: ""
}

const userBalance = (state:IBalance = balance, action: any) => {
  switch (action.type) {
    case SET_USER_BALANCE:
      return {state, value: action.balance, currency: action.currency.symbol, code: action.currency.code, name: action.currency.name}
  }

  return state;
}

export default userBalance;