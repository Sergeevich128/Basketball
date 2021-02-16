import React, {FC} from 'react';
import "./selectedBets.css";
import {connect} from "react-redux";
import {IStateBetSlip} from "../betSlipReducer";
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css';
import {changeInputStake, removeSelectedBet} from "../actions";
import SelectedBet from "./selectedBet/SelectedBet";
import {IStore} from "../../../../index";

interface Props {
  betSlip: IStateBetSlip;
  removeSelectedBet?: Function;
  setBetSlipOpen: Function;
}

const SelectedBets: FC<Props> = ({betSlip, removeSelectedBet, setBetSlipOpen}) => {

  const removeBet = (id: number) => {
    removeSelectedBet && removeSelectedBet(id);
    if (betSlip.selectedBets.length === 0) {
      setBetSlipOpen(false)
    }
  }

  return (
    <SimpleBar className="wrapper-selected-bets" forceVisible="y" autoHide={false}>
      {betSlip.selectedBets && betSlip.selectedBets.map((selectedBet) =>
        <SelectedBet
          key={selectedBet.id}
          selectedBet={selectedBet}
          removeBet={removeBet}
        />)}
    </SimpleBar>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    removeSelectedBet: (id: number) => dispatch(removeSelectedBet(id)),
    changeInputStake: (stake: number, id: number) => dispatch(changeInputStake(stake, id))
  }
}

export default connect(
  ({betSlip}: IStore) => ({
    betSlip
  }), mapDispatchToProps
)(SelectedBets);