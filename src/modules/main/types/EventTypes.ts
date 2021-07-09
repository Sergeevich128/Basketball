export type TEventStatus = 'new' | 'active' | 'finished';

export interface IEventStatus {
    id: number;
    name: TEventStatus;
}

export interface IEventAsset {
    id: number
}

export type TEventAssets = [IEventAsset, IEventAsset];

export type TEventLastResult = [number, number];

export type TEventLastResults = TEventLastResult[];

export type TEventAdvancedStatistics = IEventAdvancedStatistic[];

export interface IEventAdvancedStatistic {
    "U/O": string;
    ats: string;
    avgFullScore: string;
    avgHalfScore: string;
    avgMargin: string;
}

export interface IEventStatistics {
    advanced: TEventAdvancedStatistics;
    lastResults: TEventLastResults;
}

export interface IEventBets {
    [key: number]: IBet;
}

export interface IBet {
    id: number;
    odd: number;
    selected?: boolean;
    name: string;
    disabled?: boolean;
}

export interface IEventUser {
    isPrev?: number;
    balance?: number;
    gamesCount: number;
}

export type TEventTotalScore = [number, number]

export type TDetailScore = [number, number]

export type TDetailScores = [TDetailScore, TDetailScore, TDetailScore, TDetailScore]

export interface IEventPlacedBetAmount {
    value: number;
    display: string;
}

export interface IEventPlacedBetName {
    group: string;
    subGroup: string;
    value: string;
}

export interface IEventPlacedBet {
    amount: IEventPlacedBetAmount;
    betId: number;
    betTypeId: number;
    betName: IEventPlacedBetName;
    odd: number;
    potential: IEventPlacedBetAmount;
    status?: string,
    statusId?: number
}

export type TPlacedBets = IEventPlacedBet[];

// export interface IEventWinBet {
//     amount: Object,
//     betId: number,
//     betTypeId: number,
//     odd: number,
//     betName: Object,
//     potential: Object,
//     status: string,
//     statusId: number
// }

export interface IEventWinBets {
    [key: number]: IEventPlacedBet;
}

export interface IEventWinBetsContainer {
    bets: IEventWinBets;
    totalReturn: number;
}