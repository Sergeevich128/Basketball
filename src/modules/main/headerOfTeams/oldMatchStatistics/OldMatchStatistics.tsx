import React, {FC} from 'react';
import {IOldMatchStatistic} from "../teamsInfo";
import './oldMatchStatistics.css'

interface Props {
  statistics: IOldMatchStatistic;
}

const OldMatchStatistics: FC<Props> = ({statistics}) => (
  <div className="old-match-statistics">
    {Object.values(statistics).map(([firstNumber, lastNumber], index) => {
      return <div key={index}>
        {(firstNumber > lastNumber) ?
          <>
            <div className="selected left">{firstNumber}</div>
            <div className="colon"/>
            <div> {lastNumber}</div>
          </>
          :
          <>
            <div>{firstNumber}</div>
            <div className="colon"/>
            <div className="selected right">{lastNumber}</div>
          </>}
      </div>
    })}
  </div>
);

export default OldMatchStatistics;