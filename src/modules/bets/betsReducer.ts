import {SELECT_TAB} from "../../storages/constants";

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
  odd: number;
  selected?: boolean;
  name: string;
  subgroupName: string;
  groupName: string;
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
            subgroupName: "Anadolu Efes",
            groupName: "Handicap"
          },
          {
            id: 2,
            name: '+1',
            odd: 1.95,
            subgroupName: "Anadolu Efes",
            groupName: "Handicap"
          },
          {
            id: 3,
            name: '0',
            odd: 1.61,
            subgroupName: "Anadolu Efes",
            groupName: "Handicap"
          },
          {
            id: 4,
            name: '-1',
            odd: 1.39,
            subgroupName: "Anadolu Efes",
            groupName: "Handicap"
          },
          {
            id: 5,
            name: '-1.5',
            odd: 1.24,
            subgroupName: "Anadolu Efes",
            groupName: "Handicap"
          },
          {
            id: 6,
            name: '-2',
            odd: 1.17,
            subgroupName: "Anadolu Efes",
            groupName: "Handicap"
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
            subgroupName: "BC Zalgiris",
            groupName: "Handicap"
          },
          {
            id: 8,
            name: '-1',
            odd: 1.29,
            subgroupName: "BC Zalgiris",
            groupName: "Handicap"
          },
          {
            id: 9,
            name: '0',
            odd: 1.44,
            subgroupName: "BC Zalgiris",
            groupName: "Handicap"
          },
          {
            id: 10,
            name: '+1',
            odd: 1.59,
            subgroupName: "BC Zalgiris",
            groupName: "Handicap"
          },
          {
            id: 11,
            name: '+1.5',
            odd: 2.11,
            subgroupName: "BC Zalgiris",
            groupName: "Handicap"
          },
          {
            id: 12,
            name: '+2',
            odd: 3.5,
            subgroupName: "BC Zalgiris",
            groupName: "Handicap"
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
            subgroupName: "Under",
            groupName: "U /O total points"
          },
          {
            id: 14,
            name: '174.5',
            odd: 2.01,
            subgroupName: "Under",
            groupName: "U /O total points"
          },
          {
            id: 15,
            name: '173.5',
            odd: 1.92,
            subgroupName: "Under",
            groupName: "U /O total points"
          },
          {
            id: 16,
            name: '172.5',
            odd: 1.83,
            subgroupName: "Under",
            groupName: "U /O total points"
          },
          {
            id: 17,
            name: '171.5',
            odd: 1.74,
            subgroupName: "Under",
            groupName: "U /O total points"
          },
          {
            id: 18,
            name: '170.5',
            odd: 1.66,
            subgroupName: "Under",
            groupName: "U /O total points"
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
            subgroupName: "Over",
            groupName: "U /O total points"
          },
          {
            id: 20,
            name: '171.5',
            odd: 2.14,
            subgroupName: "Over",
            groupName: "U /O total points"
          },
          {
            id: 21,
            name: '172.5',
            odd: 2.01,
            subgroupName: "Over",
            groupName: "U /O total points"
          },
          {
            id: 22,
            name: '173.5',
            odd: 1.76,
            subgroupName: "Over",
            groupName: "U /O total points"
          },
          {
            id: 23,
            name: '174.5',
            odd: 1.69,
            subgroupName: "Over",
            groupName: "U /O total points"
          },
          {
            id: 24,
            name: '175.5',
            odd: 1.54,
            subgroupName: "Over",
            groupName: "U /O total points"
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
            subgroupName: "Home Team",
            groupName: "Money line"
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
            subgroupName: "Away Team",
            groupName: "Money line"
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
            subgroupName: "Home Team",
            groupName: "Money line"
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
            subgroupName: "Away Team",
            groupName: "Money line"
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
            subgroupName: "Home Team",
            groupName: "Winning margins"
          },
          {
            id: 30,
            name: '174.5',
            odd: 2.01,
            subgroupName: "Home Team",
            groupName: "Winning margins"
          },
          {
            id: 31,
            name: '173.5',
            odd: 1.92,
            subgroupName: "Home Team",
            groupName: "Winning margins"
          },
          {
            id: 32,
            name: '172.5',
            odd: 1.83,
            subgroupName: "Home Team",
            groupName: "Winning margins"
          },
          {
            id: 33,
            name: '171.5',
            odd: 1.74,
            subgroupName: "Home Team",
            groupName: "Winning margins"
          },
          {
            id: 34,
            name: '170.5',
            odd: 1.66,
            subgroupName: "Home Team",
            groupName: "Winning margins"
          },
          {
            id: 35,
            name: '170.5',
            odd: 1.66,
            subgroupName: "Home Team",
            groupName: "Winning margins"
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
            subgroupName: "Away Team",
            groupName: "Winning margins"
          },
          {
            id: 37,
            name: '171.5',
            odd: 2.14,
            subgroupName: "Away Team",
            groupName: "Winning margins"
          },
          {
            id: 38,
            name: '172.5',
            odd: 2.01,
            subgroupName: "Away Team",
            groupName: "Winning margins"
          },
          {
            id: 39,
            name: '173.5',
            odd: 1.76,
            subgroupName: "Away Team",
            groupName: "Winning margins"
          },
          {
            id: 40,
            name: '174.5',
            odd: 1.69,
            subgroupName: "Away Team",
            groupName: "Winning margins"
          },
          {
            id: 41,
            name: '175.5',
            odd: 1.54,
            subgroupName: "Away Team",
            groupName: "Winning margins"
          },
          {
            id: 42,
            name: '175.5',
            odd: 1.54,
            subgroupName: "Away Team",
            groupName: "Winning margins"
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
            subgroupName: "Under",
            groupName: "U/O total points half time"
          },
          {
            id: 44,
            name: '174.5',
            odd: 2.01,
            subgroupName: "Under",
            groupName: "U/O total points half time"
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
            subgroupName: "Over",
            groupName: "U/O total points half time"
          },
          {
            id: 46,
            name: '174.5',
            odd: 2.01,
            subgroupName: "Over",
            groupName: "U/O total points half time"
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
            subgroupName: "Home Team",
            groupName: "Handicap half time"
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
            subgroupName: "Away Team",
            groupName: "Handicap half time"
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
            subgroupName: "Under",
            groupName: "Team total -Odd-even"
          },
          {
            id: 50,
            name: '174.5',
            odd: 2.01,
            subgroupName: "Under",
            groupName: "Team total -Odd-even"
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
            subgroupName: "Over",
            groupName: "Team total -Odd-even"
          },
          {
            id: 52,
            name: '174.5',
            odd: 2.01,
            subgroupName: "Over",
            groupName: "Team total -Odd-even"
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
            subgroupName: "Home Team",
            groupName: "GAME total - Odd/even"
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
            subgroupName: "Away Team",
            groupName: "GAME total - Odd/even"
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
            subgroupName: "Under",
            groupName: "U/O team total"
          },
          {
            id: 56,
            name: '174.5',
            odd: 2.01,
            subgroupName: "Under",
            groupName: "U/O team total"
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
            subgroupName: "Over",
            groupName: "U/O team total"
          },
          {
            id: 58,
            name: '174.5',
            odd: 2.01,
            subgroupName: "Over",
            groupName: "U/O team total"
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