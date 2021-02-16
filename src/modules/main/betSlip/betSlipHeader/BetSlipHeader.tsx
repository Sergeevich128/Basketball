import React, {FC} from 'react';
import StakeAccordion from "../selectedBets/stakeAccordion/StakeAccordion";
import SelectedBetInput from "../selectedBets/selectedBet/selectedBetInput/SelectedBetInput";
import {IStateBetSlip} from "../betSlipReducer";
import {changeDefaultStake} from "../actions";
import {connect} from "react-redux";
import {IStore} from "../../../../index";

interface Props {
  changeDefaultStake: Function;
  betSlip: IStateBetSlip;
}

const BetSlipHeader: FC<Props> = ({changeDefaultStake, betSlip, children}) => {

  let onDefaultStakeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const stake = event.target.value;
    changeDefaultStake && changeDefaultStake(+stake)
  }

  return (
    <div className="bet-slip-header">
      <div>Bet Slip</div>
      <StakeAccordion callback={changeDefaultStake}/>
      <div>
        <div>
          <span>Default Stake</span>
          <SelectedBetInput
            onStakeChange={onDefaultStakeChange}
            value={betSlip.defaultStake}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeDefaultStake: (stake: any) => dispatch(changeDefaultStake(stake)),
  }
}

export default connect(
  ({betSlip}: IStore) => ({
    betSlip
  }),
  mapDispatchToProps
)(BetSlipHeader);