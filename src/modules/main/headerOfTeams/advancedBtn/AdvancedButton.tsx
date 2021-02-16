import React, {FC} from 'react';
import './advancedBtn.css'

interface Props {
  showAdvancedStatistics: Function;
}

const AdvancedButton: FC<Props> = ({showAdvancedStatistics}) => (
  <svg onClick={() => showAdvancedStatistics()} className="advanced-btn" width="24" height="24" viewBox="0 0 24 24" fill="none"
       xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#EAEAEA"/>
    <circle cx="12" cy="12" r="12" fill="#121212"/>
    <rect x="11" y="4" width="2" height="14" rx="1" fill="#EB460C"/>
    <rect x="6" y="9" width="2" height="9" rx="1" fill="#EB460C"/>
    <rect x="16" y="11" width="2" height="7" rx="1" fill="#EB460C"/>
  </svg>
);

export default AdvancedButton;