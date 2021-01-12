import {SELECT_TAB} from "../../../storages/constants";

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

export interface ITabs {
  id: number;
  name: string;
}

export interface IBetsState {
  betGroups: IGroup[];
  betGroupsLeft: IGroup[];
  betGroupsRight: IGroup[];
  tabs: ITabs[];
  activeTabId: number;
}

const betGroups: IGroup[] = [
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
          },
          {
            id: 2,
            name: '+1',
            odd: 1.95,
          },
          {
            id: 3,
            name: '0',
            odd: 1.61,
          },
          {
            id: 4,
            name: '-1',
            odd: 1.39,
          },
          {
            id: 5,
            name: '-1.5',
            odd: 1.24,
          },
          {
            id: 6,
            name: '-2',
            odd: 1.17,
          },
        ]
      },
      {
        id: 2,
        name: "BC Zalgiris",
        bets: [
          {
            id: 7,
            name: '-1.5',
            odd: 1.16,
          },
          {
            id: 8,
            name: '-1',
            odd: 1.29,
          },
          {
            id: 9,
            name: '0',
            odd: 1.44,
          },
          {
            id: 10,
            name: '+1',
            odd: 1.59,
          },
          {
            id: 11,
            name: '+1.5',
            odd: 2.11,
          },
          {
            id: 12,
            name: '+2',
            odd: 3.5,
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
            id: 13,
            name: '175.5',
            odd: 2.09,
          },
          {
            id: 14,
            name: '174.5',
            odd: 2.01,
          },
          {
            id: 15,
            name: '173.5',
            odd: 1.92,
          },
          {
            id: 16,
            name: '172.5',
            odd: 1.83,
          },
          {
            id: 17,
            name: '171.5',
            odd: 1.74,
          },
          {
            id: 18,
            name: '170.5',
            odd: 1.66,
          },
        ]
      },
      {
        id: 2,
        name: "Over",
        bets: [
          {
            id: 19,
            name: '170.5',
            odd: 2.26,
          },
          {
            id: 20,
            name: '171.5',
            odd: 2.14,
          },
          {
            id: 21,
            name: '172.5',
            odd: 2.01,
          },
          {
            id: 22,
            name: '173.5',
            odd: 1.76,
          },
          {
            id: 23,
            name: '174.5',
            odd: 1.69,
          },
          {
            id: 24,
            name: '175.5',
            odd: 1.54,
          },
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Money line',
    subgroups: [
      {
        id: 1,
        name: "Home Team",
        bets: [
          {
            id: 27,
            name: '175.5',
            odd: 2.30,
          }
        ]
      },
      {
        id: 2,
        name: "Away Team",
        bets: [
          {
            id: 28,
            name: '175.5',
            odd: 1.23,
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Money line half time',
    subgroups: [
      {
        id: 1,
        name: "Home Team",
        bets: [
          {
            id: 25,
            name: '175.5',
            odd: 2.09,
          }
        ]
      },
      {
        id: 2,
        name: "Away Team",
        bets: [
          {
            id: 26,
            name: '175.5',
            odd: 2.09,
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Winning margins',
    subgroups: [
      {
        id: 1,
        name: "Home Team",
        bets: [
          {
            id: 29,
            name: '175.5',
            odd: 2.09,
          },
          {
            id: 30,
            name: '174.5',
            odd: 2.01,
          },
          {
            id: 31,
            name: '173.5',
            odd: 1.92,
          },
          {
            id: 32,
            name: '172.5',
            odd: 1.83,
          },
          {
            id: 33,
            name: '171.5',
            odd: 1.74,
          },
          {
            id: 34,
            name: '170.5',
            odd: 1.66,
          },
          {
            id: 35,
            name: '170.5',
            odd: 1.66,
          },
        ]
      },
      {
        id: 2,
        name: "Away Team",
        bets: [
          {
            id: 36,
            name: '170.5',
            odd: 2.26,
          },
          {
            id: 37,
            name: '171.5',
            odd: 2.14,
          },
          {
            id: 38,
            name: '172.5',
            odd: 2.01,
          },
          {
            id: 39,
            name: '173.5',
            odd: 1.76,
          },
          {
            id: 40,
            name: '174.5',
            odd: 1.69,
          },
          {
            id: 41,
            name: '175.5',
            odd: 1.54,
          },
          {
            id: 42,
            name: '175.5',
            odd: 1.54,
          },
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'U/O total points half time',
    subgroups: [
      {
        id: 1,
        name: "Under",
        bets: [
          {
            id: 43,
            name: '175.5',
            odd: 2.09,
          },
          {
            id: 44,
            name: '174.5',
            odd: 2.01,
          }
        ]
      },
      {
        id: 2,
        name: "Over",
        bets: [
          {
            id: 45,
            name: '175.5',
            odd: 2.09,
          },
          {
            id: 46,
            name: '174.5',
            odd: 2.01,
          }
        ]
      }
    ]
  },
  {
    id: 7,
    name: 'Handicap half time',
    subgroups: [
      {
        id: 1,
        name: "Home Team",
        bets: [
          {
            id: 47,
            name: '175.5',
            odd: 2.09,
          }
        ]
      },
      {
        id: 2,
        name: "Away Team",
        bets: [
          {
            id: 48,
            name: '175.5',
            odd: 2.09,
          }
        ]
      }
    ]
  },
  {
    id: 8,
    name: 'Team total - Odd/even',
    subgroups: [
      {
        id: 1,
        name: "Under",
        bets: [
          {
            id: 49,
            name: '175.5',
            odd: 2.09,
          },
          {
            id: 50,
            name: '174.5',
            odd: 2.01,
          }
        ]
      },
      {
        id: 2,
        name: "Over",
        bets: [
          {
            id: 51,
            name: '175.5',
            odd: 2.09,
          },
          {
            id: 52,
            name: '174.5',
            odd: 2.01,
          }
        ]
      }
    ]
  },
  {
    id: 9,
    name: 'GAME total - Odd/even',
    subgroups: [
      {
        id: 1,
        name: "Home Team",
        bets: [
          {
            id: 53,
            name: '175.5',
            odd: 2.09,
          }
        ]
      },
      {
        id: 2,
        name: "Away Team",
        bets: [
          {
            id: 54,
            name: '175.5',
            odd: 2.09,
          }
        ]
      }
    ]
  },
  {
    id: 10,
    name: 'U/O team total',
    subgroups: [
      {
        id: 1,
        name: "Under",
        bets: [
          {
            id: 55,
            name: '175.5',
            odd: 2.09,
          },
          {
            id: 56,
            name: '174.5',
            odd: 2.01,
          }
        ]
      },
      {
        id: 2,
        name: "Over",
        bets: [
          {
            id: 57,
            name: '175.5',
            odd: 2.09,
          },
          {
            id: 58,
            name: '174.5',
            odd: 2.01,
          }
        ]
      }
    ]
  },
];
const tabs: ITabs[] = [
  {
    id: 1,
    name: 'All',
  },
  {
    id: 2,
    name: 'Game Lines',
  },
  {
    id: 3,
    name: 'U/O',
  },
  {
    id: 4,
    name: 'Halftime',
  },
];

const initialState: IBetsState = {
  betGroups,
  betGroupsLeft: betGroups.filter((item, index) => !(index % 2)),
  betGroupsRight: betGroups.filter((item, index) => (index % 2)),
  tabs,
  activeTabId: tabs[0].id
}

const betsReducer = (state: IBetsState = initialState, action: any) => {
  switch (action.type) {
    case SELECT_TAB:
      return {...state, activeTabId: action.id}
  }
  return state;
}

export default betsReducer;