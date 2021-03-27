import React, {FC} from 'react';
import {IBet} from "../betsReducer";
import {connect} from "react-redux";
import {IStore} from "../../../index";
import {addBet, changeBetSelected} from "../actions";
import {classList} from "../../../core/constants";

interface Props {
  addBet?: Function;
  changeSelected?: Function;
  bet: IBet;
  name?: string;
}

const Bet: FC<Props> = ({addBet,changeSelected, bet, name}) => {

  const handleBetClick = (bet: IBet) => {
    addBet && addBet(bet);
    changeSelected && changeSelected(bet.id);
  }

  return (
    <div
      data-bet-id={bet.id}
      className={classList([
        "bet",
        bet.selected && "selected",
        bet.disabled && "disabled",
        !(name || bet.name) && "one-value"])}
      onClick={() => handleBetClick(bet)}
    >
      {name || bet.name ? <span>{name || bet.name}</span> : null}
      <span>{bet.odd}</span>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addBet: (bet: IBet) => dispatch(addBet(bet)),
    changeSelected: (id: number) => dispatch(changeBetSelected(id)),
  }
}

export default connect(
  ({bets}: IStore) => ({bets}),
  mapDispatchToProps
)(Bet);