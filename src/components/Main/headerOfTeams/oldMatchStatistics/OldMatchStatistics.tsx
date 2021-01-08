import React, {FC} from 'react';
import {IOldMatchStatistic} from "../../../../storages/teamsInfo";
import './oldMatchStatistics.css'

interface Props {
  statistics: IOldMatchStatistic;
}

const OldMatchStatistics: FC<Props> = ({statistics}) => (
  <div className="oldMatchStatistics">
    {Object.values(statistics).map(([firstNumber, lastNumber], index) => {
      if (firstNumber > lastNumber) {
        return <div key={index}>
          <div className="selected left">{firstNumber}</div>
          <div className="colon"/>
          <div> {lastNumber}</div>
        </div>
      } else {
        return <div key={index}>
          <div>{firstNumber}</div>
          <div className="colon"/>
          <div className="selected right">{lastNumber}</div>
        </div>
      }
    })}
  </div>
);

export default OldMatchStatistics;