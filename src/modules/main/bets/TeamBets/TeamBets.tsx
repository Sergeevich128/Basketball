import React, {FC} from 'react';
import {connect} from "react-redux";
import {IStore} from "../../../../index";
import {IBetsState, ISubGroup} from "../betsReducer";
import Bet from "../components/Bet";
import './teamBets.css'

interface Props {
  subgroups?: ISubGroup[];
  bets: IBetsState;
}

const TeamBets: FC<Props> = ({bets}) => {
  const bet = bets.betGroups.filter((el) => el.name === 'Money line');

  return (
    <div className="team-bets">
      <Bet bet={bet[0].subgroups[0].bets[0]} name={bet[0].subgroups[0].name}/>
      <div className="vs">
        <div className="romb">
          <div>vs</div>
        </div>
      </div>
      <Bet bet={bet[0].subgroups[1].bets[0]} name={bet[0].subgroups[1].name}/>
    </div>
  );
};

export default connect(
  ({bets}: IStore) => ({
    bets
  }),
)(TeamBets);