import React, {FC} from 'react';
import './changeMatch.css'

interface Props {
  changePrev: Function
  changeNext: Function
}

const ChangeMatch: FC<Props> = ({changePrev, changeNext}) => (
  <div className="change-match">
    <div className="button-prev">
      <svg onClick={() => changePrev()} width="14" height="21" viewBox="0 0 14 21" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.940062 10.5034L11.3774 21L13.1866 19.1812L4.55259 10.4991L13.1875 1.81878L11.3783 -1.5817e-07L0.937501 10.494L0.94177 10.4991L0.940062 10.5034Z"
          fill="#EB460C"/>
      </svg>
      <span>Prev</span>
    </div>
    <div className="button-next">
      <span>Next</span>
      <svg onClick={() => changeNext()} width="14" height="21" viewBox="0 0 14 21" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13.0599 10.4966L2.62261 0L0.813353 1.81878L9.44741 10.5009L0.8125 19.1812L2.62175 21L13.0625 10.506L13.0582 10.5009L13.0599 10.4966Z"
          fill="#EB460C"/>
      </svg>
    </div>
  </div>
);

export default ChangeMatch;