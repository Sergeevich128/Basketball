export interface IBalance {
  value: string;
  currency: string
}

const balance: IBalance = {
  value: "9999,00",
  currency: "FUN"
}

const userBalance = (state:IBalance = balance, action: any) => {
  return state;
}

export default userBalance;