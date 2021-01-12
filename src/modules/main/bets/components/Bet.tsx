import React, {FC} from 'react';
import {IBet, ISubGroup} from "../betsReducer";
import {IStateBetSlip} from "../../selectedBets/betSlip";
import {connect} from "react-redux";
import {IStore} from "../../../../index";
import {addBet} from "../actions";

interface Props {
  addBet?: Function;
  betSlip?: IStateBetSlip;
  subgroups?: ISubGroup[];
  bet: IBet;
  name?: string;
  odd?: number;
}

const Bet: FC<Props> = ({betSlip, addBet, bet, name, odd}) => {
  const handleBetClick = (bet: IBet) => {
    addBet && addBet(bet)
  }

  return (
    <div
      data-bet-id={bet.id}
      className={"bet" + (betSlip?.selectedBets.find(({id}) => id === bet.id) ? " selected" : "")}
      onClick={() => handleBetClick(bet)}
    >
      <span>{name || bet.name}</span>
      <span>{bet.odd}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addBet: (bet: IBet) => dispatch(addBet(bet)),
  }
}

export default connect(
  ({betSlip}: IStore) => ({betSlip}),
  mapDispatchToProps
)(Bet);