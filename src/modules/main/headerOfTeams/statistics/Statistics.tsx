import React, {FC} from 'react';
import './statistics.css'

interface Props {
  strength: number
}

const Statistics: FC<Props> = ({strength}) => (
  <div className="progress-circle">
    <svg width="50" height="50px">
      <circle className="progress" r="20.5" cx="25" cy="25" strokeDasharray="128.8 128.8"
              strokeDashoffset={-(132 - (strength * 100) / 100 * 128.8)}/>
    </svg>
    <span>{strength * 100}%</span>
  </div>
);

export default Statistics;