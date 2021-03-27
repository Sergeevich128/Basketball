import React, {FC} from 'react';
import {ILastResults} from "../teamsInfo";
import './lastResults.css'

interface Props {
  lastResults: ILastResults;
}

const LastResults: FC<Props> = ({lastResults}) => (
  <div className="last-results">
      {Object.values(lastResults).map(([firstNumber, lastNumber], index) =>
        <div key={index}>
          <>
                <span className="left">
                  <span className={firstNumber > lastNumber ? "won" : "lost"}>{firstNumber}</span>
                </span>
            <span className="colon">:</span>
            <span className="right">
                  <span className={firstNumber > lastNumber ? "lost" : "won"}>{lastNumber}</span>
                </span>
          </>
        </div>)}
  </div>
);

export default LastResults;