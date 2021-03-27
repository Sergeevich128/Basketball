import React, {FC} from 'react';
import './advancedStatictics.css';
import {IAdvancedStatistic} from "../teamsInfo";

interface Props {
    statistics: IAdvancedStatistic;
}

const teamNames: Array<string> = [
  "ATS",
  "U/O",
  "MARGIN",
  "FULL",
  "HALF"
]

const AdvancedStatistics: FC<Props> = ({statistics}) => (
  <div className="advanced-statistics">
    {statistics ? Object.entries(statistics).map(([key, value], index) => {
      return <div key={index}>
        <span>{teamNames[index]}</span>
        <span>{value}</span>
      </div>
    }) : null}

    {/*<div>*/}
    {/*  {Object.entries(statistics).map(([key, value], index) => {*/}
    {/*    return <div key={index}>*/}
    {/*      <span>{teamNames[key][0]}</span>*/}
    {/*      <span>{value}</span>*/}
    {/*    </div>*/}
    {/*  })}*/}
    {/*</div>*/}
  </div>
);

export default AdvancedStatistics;