
export interface ISelectedBet {
    id: number;
    name: string;
    odd: number;
    value: number;
}

export const initialState:{[key: number]: ISelectedBet} = {};


const selectedBets = (state = initialState) => {
    return state;
}

export default selectedBets;