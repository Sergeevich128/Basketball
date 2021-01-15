import React, {FC} from 'react';
import "./selectedBets.css";
import {connect} from "react-redux";
import {IStore} from "../../index";
import {ISelectedBet, IStateBetSlip} from "./betSlip";
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css';
import {changeInputStake, removeSelectedBet} from "./actions";
import {IBetsState} from "../bets/betsReducer";

interface Props {
  betSlip: IStateBetSlip;
  removeSelectedBet?: Function;
  changeInputStake?: Function;
  bets: IBetsState;
}

const SelectedBets: FC<Props> = ({betSlip, removeSelectedBet, changeInputStake, bets}) => {
  const removeBet = (id: number) => {
    removeSelectedBet && removeSelectedBet(id);
  }

  let onStakeChange = (event: React.ChangeEvent<HTMLInputElement>, selectedBet: ISelectedBet) => {
    changeInputStake && changeInputStake(event.currentTarget?.value, selectedBet.id);
  }

  return (
    <SimpleBar forceVisible="y" autoHide={false} style={{maxHeight: 287}}>
      {betSlip.selectedBets && betSlip.selectedBets.map((selectedBet, index) => {

        return <div key={index} className="selected-bet">
          <div>
            <h6>{selectedBet.groupName}</h6>
            <h5>{selectedBet.subgroupName} ({selectedBet.name})<span>@{selectedBet.odd}</span></h5>
          </div>
          <div>
            <input type="number" onChange={(event) => onStakeChange(event, selectedBet)}
                   value={selectedBet.value}/>
            <div onClick={() => removeBet(selectedBet.id)} className="remove-selected-bet"/>
          </div>
        </div>
      })}
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
  ({betSlip, bets}: IStore) => ({
    betSlip,
    bets
  }), mapDispatchToProps
)(SelectedBets);