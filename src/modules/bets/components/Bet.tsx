import React, {FC} from 'react';
import {IBet, ISubGroup} from "../betsReducer";
import {connect} from "react-redux";
import {IStore} from "../../../index";
import {addBet, changeValueOfSelectedField} from "../actions";

interface Props {
  addBet?: Function;
  changeValueOfSelectedField?: Function;
  subgroups?: ISubGroup[];
  bet: IBet;
  name?: string;
  odd?: number;
}

const Bet: FC<Props> = ({addBet,changeValueOfSelectedField, bet, name, }) => {
  const handleBetClick = (bet: IBet) => {
    addBet && addBet(bet)
    changeValueOfSelectedField && changeValueOfSelectedField(bet.id)
  }

  const classList = [
    "bet",
    bet.selected && "selected"
  ].filter(Boolean).join(" ");

  return (
    <div
      data-bet-id={bet.id}
      className={classList}
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
    changeValueOfSelectedField: (id: number) => dispatch(changeValueOfSelectedField(id)),
  }
}

export default connect(
  ({betSlip}: IStore) => ({betSlip}),
  mapDispatchToProps
)(Bet);