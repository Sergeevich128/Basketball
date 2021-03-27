import {CHANGE_BET_SELECTED, DISABLE_BET, SELECT_TAB, SET_BETS, SET_BETS_TEMPLATE} from "../../storages/constants";

export interface IGroup {
    id: number;
    name: string;
    subGroups?: ISubGroup[];
    betTypes?: Array<number>;
}

export interface ISubGroup {
    id: number;
    name: string;
    betTypes: Array<number>;
}

export interface IBetsList {
    [index: number]: IBet
}

export interface IBet {
    id: number;
    odd: number;
    selected?: boolean;
    name: string;
    subgroupName: string;
    groupName: string;
    disabled?: boolean;
}

export interface IBetsState {
    betGroups: IGroup[];
    betGroupsLeft: IGroup[];
    betGroupsRight: IGroup[];
    tabs: string[];
    betsList: IBetsList;
    activeTab: string;
    betsTemplate: IBetsTemplate[];
}

export interface IBetsTemplate {
    groups: Array<Object>;
    id: number;
    name: string;
    options: IGroupOptions;
}

export interface IGroupOptions {
    colsCount: IColsCount;
    colsGroups: IColsGroups;
}

export interface IColsCount {
   large: number;
   middle: number;
   small: number;
}

export interface IColsGroups {
    large: Array<number>;
    middle: Array<number>;
    small: Array<number>;
}

let betsTemplate: IBetsTemplate[] = [];

let betGroups: IGroup[] = [];

let betsList: IBetsList = []

const tabs: string[] = [
    'All',
    'Game Lines',
    'U/O',
    'Halftime',
];

const initialState: IBetsState = {
    betGroups,
    betGroupsLeft: betGroups.filter((item, index) => !(index % 2)),
    betGroupsRight: betGroups.filter((item, index) => (index % 2)),
    tabs,
    betsList,
    betsTemplate,
    activeTab: "All"
}

const betsReducer = (state: IBetsState = initialState, action: any) => {
    const bet = state.betsList[action.id];
    switch (action.type) {
        case SELECT_TAB:
            return {...state, activeTab: action.name}
        case CHANGE_BET_SELECTED:
            if (bet) bet.selected = bet.selected !== true;
            return {...state}
        case DISABLE_BET:
            if (bet) bet.disabled = action.disabled;
            return {...state}
        case SET_BETS:
            betsList = action.bets;
            Object.values(betsList).forEach((bet) => {
                bet.disabled = false;
                bet.selected = false;

            });
            return {...state, betsList: action.bets}
        case SET_BETS_TEMPLATE:
            betGroups = action.betsTemplate[0].groups;
            betsTemplate = action.betsTemplate;

            return {...state,
                betGroups: action.betsTemplate[0].groups,
                betsTemplate: action.betsTemplate,
                betGroupsLeft: action.betsTemplate[0].groups.filter((item: IGroup, index: number) => !(index % 2)),
                betGroupsRight: action.betsTemplate[0].groups.filter((item: IGroup, index: number) => (index % 2))
            }
    }
    return state;
}

export default betsReducer;