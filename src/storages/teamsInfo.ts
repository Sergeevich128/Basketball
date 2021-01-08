export interface ITeams {
  [key: number]: ITeam
}

export interface ITeam {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  fullName: string;
  shortName: string;
  strength: number;
  bgColor: string;
  statistics: IStatistics;
}

export interface IStatistics {
  ats: string;
  margin: string;
  uo: string;
  full: string;
  half: string;
}

export interface ITeamsState {
  teams: ITeams;
  oldMatchStatistics: IOldMatchStatistics;
}

export interface IOldMatchStatistics {
  [key: string]: IOldMatchStatistic;
}

export interface IOldMatchStatistic {
  1: Array<number>;
  2: Array<number>;
  3: Array<number>;
  4: Array<number>;
  5: Array<number>;
}

const teams: ITeams = {
  1: {
    id: 1,
    name: "Anadolu Efes",
    firstName: "Anadolu",
    lastName: "Efes",
    shortName: "EFS",
    fullName: "Anadolu Efes Istanbul",
    strength: 0.89,
    bgColor: "#1E46CA",
    statistics: {
      "ats": "50-32",
      "margin": "+2.5/5.1",
      "uo": "3/2",
      "full": "100:102",
      "half": "40:48"
    }
  },
  2: {
    id: 2,
    name: "Real Madrid",
    firstName: "Real",
    lastName: "Madrid",
    shortName: "RMB",
    fullName: "Real Madrid",
    strength: 0.91,
    bgColor: "#702A67",
    statistics: {
      "ats": "50-32",
      "margin": "+2.5/5.1",
      "uo": "3/2",
      "full": "100:102",
      "half": "40:48"
    }
  },
  3: {
    id: 3,
    name: "CSKA Moscow",
    firstName: "CSKA",
    lastName: "Moscow",
    shortName: "CSK",
    fullName: "CSKA Moscow",
    strength: 0.95,
    bgColor: "#B70A11",
    statistics: {
      "ats": "50-32",
      "margin": "+2.5/5.1",
      "uo": "3/2",
      "full": "100:102",
      "half": "40:48"
    }
  },
  4: {
    id: 4,
    name: "Armani Milano",
    firstName: "Armani",
    lastName: "Milano",
    shortName: "AXM",
    fullName: "AX Armani Milano",
    strength: 0.77,
    bgColor: "#E2231A",
    statistics: {
      "ats": "50-32",
      "margin": "+2.5/5.1",
      "uo": "3/2",
      "full": "100:102",
      "half": "40:48"
    }
  },
  5: {
    id: 5,
    name: "Fenerbahce",
    firstName: "",
    lastName: "Fenerbahce",
    shortName: "FNB",
    fullName: "Fenerbahce Istanbul",
    strength: 0.85,
    bgColor: "#EEBF1A",
    statistics: {
      "ats": "50-32",
      "margin": "+2.5/5.1",
      "uo": "3/2",
      "full": "100:102",
      "half": "40:48"
    }
  },
  6: {
    id: 6,
    name: "Maccabi Tel-Aviv",
    firstName: "Maccabi",
    lastName: "Tel-Aviv",
    shortName: "MTA",
    fullName: "Maccabi Tel-Aviv",
    strength: 0.81,
    bgColor: "#E9D100",
    statistics: {
      "ats": "50-32",
      "margin": "+2.5/5.1",
      "uo": "3/2",
      "full": "100:102",
      "half": "40:48"
    }
  },
  7: {
    id: 7,
    name: "Olympiacos",
    firstName: "",
    lastName: "Olympiacos",
    shortName: "OLY",
    fullName: "Olympiacos Piraeus",
    strength: 0.82,
    bgColor: "#E51636",
    statistics: {
      "ats": "50-32",
      "margin": "+2.5/5.1",
      "uo": "3/2",
      "full": "100:102",
      "half": "40:48"
    }
  },
  8: {
    id: 8,
    name: "Panathinaikos",
    firstName: "",
    lastName: "Panathinaikos",
    shortName: "PAO",
    fullName: "Panathinaikos Athens",
    strength: 0.8,
    bgColor: "#00793F",
    statistics: {
      "ats": "50-32",
      "margin": "+2.5/5.1",
      "uo": "3/2",
      "full": "100:102",
      "half": "40:48"
    }
  },
  9: {
    id: 9,
    name: "Partizan Belgrade",
    firstName: "Partizan",
    lastName: "Belgrade",
    shortName: "PAR",
    fullName: "Partizan Belgrade",
    strength: 0.73,
    bgColor: "#222425",
    statistics: {
      "ats": "50-32",
      "margin": "+2.5/5.1",
      "uo": "3/2",
      "full": "100:102",
      "half": "40:48"
    }
  },
  10: {
    id: 10,
    name: "Baskonia",
    firstName: "",
    lastName: "Baskonia",
    shortName: "BAS",
    fullName: "Baskonia Vitoria",
    strength: 0.79,
    bgColor: "#142036",
    statistics: {
      "ats": "50-32",
      "margin": "+2.5/5.1",
      "uo": "3/2",
      "full": "100:102",
      "half": "40:48"
    }
  },
  11: {
    id: 11,
    name: "Malaga",
    firstName: "",
    lastName: "Malaga",
    shortName: "MAL",
    fullName: "Unicaja Malaga",
    strength: 0.72,
    bgColor: "#4E9E47",
    statistics: {
      "ats": "50-32",
      "margin": "+2.5/5.1",
      "uo": "3/2",
      "full": "100:102",
      "half": "40:48"
    }
  },
  12: {
    id: 12,
    name: "Zalgiris",
    firstName: "",
    lastName: "Zalgiris",
    shortName: "ZAL",
    fullName: "Zalgiris Kaunas",
    strength: 0.75,
    bgColor: "#1D4745",
    statistics: {
      "ats": "49-30",
      "margin": "+2.4/5.0",
      "uo": "2/3",
      "full": "102:104",
      "half": "45:50"
    }
  },
  13: {
    id: 13,
    name: "FC Barcelona",
    firstName: "FC",
    lastName: "Barcelona",
    shortName: "FCB",
    fullName: "FC Barcelona",
    strength: 0.87,
    bgColor: "#2E296B",
    statistics: {
      "ats": "50-32",
      "margin": "+2.5/5.1",
      "uo": "3/2",
      "full": "100:102",
      "half": "40:48"
    }
  },
  14: {
    id: 14,
    name: "Olimpija Ljubljana",
    firstName: "Olimpija",
    lastName: "Ljubljana",
    shortName: "LUB",
    fullName: "Union Olimpija Ljubljana",
    strength: 0.7,
    bgColor: "#0D8B48",
    statistics: {
      "ats": "50-32",
      "margin": "+2.5/5.1",
      "uo": "3/2",
      "full": "100:102",
      "half": "40:48"
    }
  }
};

const oldMatchStatistics = {
  Anadolu_Zalgiris: {
    1: [
      75, 88
    ],
    2: [
      76, 72
    ],
    3: [
      81, 89
    ],
    4: [
      75, 88
    ],
    5: [
      76, 72
    ],
  }

}

const initialState = {
  teams,
  oldMatchStatistics
}


const teamsInfo = (state: ITeamsState = initialState, action: any) => {
  return state;
}

export default teamsInfo;