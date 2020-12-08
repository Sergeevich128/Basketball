export interface IGroup {
    id: number;
    name: string;
    subgroups: ISubGroup[];
}

export interface ISubGroup {
    id: number;
    name: string;
    bets: IBet[];
}

export interface IBet {
    id: number;
    name: string;
    odd: number;
    selected?: boolean;
}

export const initialState: IGroup[] = [
    {
        id: 1,
        name: 'Handicap',
        subgroups: [
            {
                id: 1,
                name: "Anadolu Efes",
                bets: [
                    {
                        id: 1,
                        name: '+1.5',
                        odd: 2.46,
                        selected: false
                    },
                    {
                        id: 2,
                        name: '+1',
                        odd: 1.95,
                        selected: false
                    },
                    {
                        id: 3,
                        name: '0',
                        odd: 1.61,
                        selected: false
                    },
                    {
                        id: 4,
                        name: '-1',
                        odd: 1.39,
                        selected: false
                    },
                    {
                        id: 5,
                        name: '-1.5',
                        odd: 1.24,
                        selected: false
                    },
                    {
                        id: 6,
                        name: '-2',
                        odd: 1.17,
                        selected: false
                    },
                ]
            },
            {
                id: 2,
                name: "BC Zalgiris",
                bets: [
                    {
                        id: 1,
                        name: '-1.5',
                        odd: 1.16,
                        selected: false
                    },
                    {
                        id: 2,
                        name: '-1',
                        odd: 1.29,
                        selected: false
                    },
                    {
                        id: 3,
                        name: '0',
                        odd: 1.44,
                        selected: false
                    },
                    {
                        id: 4,
                        name: '+1',
                        odd: 1.59,
                        selected: false
                    },
                    {
                        id: 5,
                        name: '+1.5',
                        odd: 2.11,
                        selected: false
                    },
                    {
                        id: 6,
                        name: '+2',
                        odd: 3.5,
                        selected: false
                    },
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'U / O total points',
        subgroups: [
            {
                id: 1,
                name: "Under",
                bets: [
                    {
                        id: 1,
                        name: '175.5',
                        odd: 2.09,
                        selected: false
                    },
                    {
                        id: 2,
                        name: '174.5',
                        odd: 2.01,
                        selected: false
                    },
                    {
                        id: 3,
                        name: '173.5',
                        odd: 1.92,
                        selected: false
                    },
                    {
                        id: 4,
                        name: '172.5',
                        odd: 1.83,
                        selected: false
                    },
                    {
                        id: 5,
                        name: '171.5',
                        odd: 1.74,
                        selected: false
                    },
                    {
                        id: 6,
                        name: '170.5',
                        odd: 1.66,
                        selected: false
                    },
                ]
            },
            {
                id: 2,
                name: "Over",
                bets: [
                    {
                        id: 1,
                        name: '170.5',
                        odd: 2.26,
                        selected: false
                    },
                    {
                        id: 2,
                        name: '171.5',
                        odd: 2.14,
                        selected: false
                    },
                    {
                        id: 3,
                        name: '172.5',
                        odd: 2.01,
                        selected: false
                    },
                    {
                        id: 4,
                        name: '173.5',
                        odd: 1.76,
                        selected: false
                    },
                    {
                        id: 5,
                        name: '174.5',
                        odd: 1.69,
                        selected: false
                    },
                    {
                        id: 6,
                        name: '175.5',
                        odd: 1.54,
                        selected: false
                    },
                ]
            }
        ]
    }
];


const betsReducer = (state = initialState, action:Object) => {
    return state;
}

export default betsReducer;