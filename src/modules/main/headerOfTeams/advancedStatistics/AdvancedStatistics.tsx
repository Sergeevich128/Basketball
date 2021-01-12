import React, {FC} from 'react';
import {IStatistics} from "../teamsInfo";
import './advancedStatictics.css';

interface Props {
  team: IStatistics;
}

const teamNames: { [key: string]: string[] } = {
  ats: ["ATS", "ATS"],
  margin: ["MARGIN", "AVG MARGIN"],
  uo: ["U/O", "U/O"],
  full: ["FULL", "AVG FULL"],
  half: ["HALF", "AVG HALF"]
}

const AdvancedStatistics: FC<Props> = ({team}) => (
  <div className="advanced-statistics">
    <div>
      {Object.entries(team).map(([key, value], index) => {
        return <div key={index}>
          <span>{teamNames[key][1]}</span>
          <span>{value}</span>
        </div>
      })}
    </div>
    <div>
      {Object.entries(team).map(([key, value], index) => {
        return <div key={index}>
          <span>{teamNames[key][0]}</span>
          <span>{value}</span>
        </div>
      })}
    </div>
  </div>
);

export default AdvancedStatistics;