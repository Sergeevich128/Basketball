import React, {FC, useEffect} from 'react';
import {IBet, ISubGroup} from "../../../storages/betsReducer";
import {connect} from "react-redux";
import {IStore} from "../../../index";
import Bet from "./bet/Bet";

interface Props {
  key?: number;
  name?: string;
  subgroups?: ISubGroup[];
}

const BetGroup: FC<Props> = ({key, name, subgroups}) => {
  useEffect(() => {
    let subGroups = document.getElementsByClassName('subGroups');
    for (let el = 0; el < subGroups.length; el++) {
      let subGroup = subGroups[el] as HTMLElement;
      subGroup.dataset.height = subGroup.scrollHeight.toString();
      subGroup.style.height = `${subGroup.dataset.height}px`;
    }
  })

  const openGroup = (event: React.MouseEvent<HTMLDivElement>) => {
    let group: HTMLElement | null = event.currentTarget.closest('.group');
    if (group) {
      let subGroup = group.getElementsByClassName('subGroups')[0] as HTMLElement;
      if (subGroup.style.height === '0px') {
        subGroup.style.height = `${subGroup.dataset.height}px`;
      } else {
        subGroup.style.height = '0px'
      }
      group.classList.toggle('closed');
    }
  }

  return (
    <div key={key} className={'group'}>
      <h3>
        <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 0L9.88091 5.41115L15.6085 5.52786L11.0434 8.98885L12.7023 14.4721L8 11.2L3.29772 14.4721L4.95662 8.98885L0.391548 5.52786L6.11909 5.41115L8 0Z"
            fill="#232527"
          />
        </svg>
        {name}
        <div onClick={openGroup} className='openGroup'/>
      </h3>
      <div className={'subGroups'}>
        {subgroups && subgroups.map((subgroup: ISubGroup) => (
          <div key={subgroup.id} className={'subgroup'}>
            <h4>{subgroup.name}</h4>
            <div className={'bets'}>
              {subgroup.bets.map((bet: IBet) => <Bet key={bet.id} bet={bet}/>)}
            </div>
          </div>)
        )}
      </div>
    </div>
  );
};


export default connect(
  ({betSlip}: IStore) => ({betSlip}),
)(BetGroup);