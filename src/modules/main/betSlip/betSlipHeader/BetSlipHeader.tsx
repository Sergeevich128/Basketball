import React, {FC, useEffect} from 'react';
import "./betSlipHeader.css"
import StakeInput from "../selectedBets/selectedBet/selectedBetInput/StakeInput";
import {IStateBetSlip} from "../betSlipReducer";
import {changeDefaultStake, setBetError} from "../actions";
import {connect} from "react-redux";
import {IStore} from "../../../../index";
import {betsConfig, classList} from "../../../../core/constants";

interface Props {
    changeDefaultStake: Function;
    betSlip: IStateBetSlip;
    setBetError: Function;
}

const BetSlipHeader: FC<Props> = ({changeDefaultStake, betSlip, setBetError, children}) => {

    useEffect(() => {
        if (betSlip.defaultStake > betsConfig.maxStake) {
            setBetError("error-max", "default")
        } else if (betSlip.defaultStake < betsConfig.minStake) {
            setBetError("error-min", "default")
        } else {
            setBetError("", "default")
        }
    }, [betSlip.totalBet, betSlip.defaultStake])


    return (
        <div className={classList([
            "bet-slip-header",
            "keyboard-inject",
            betSlip.defaultStakeErrorType
        ])}>
            <h3>Bet Slip</h3>
            <div>
                <div className="default-stake">
                    <span>Default Stake</span>
                    <StakeInput
                        onStakeChange={changeDefaultStake}
                        stake={betSlip.defaultStake.toString()}
                    />
                </div>
                {children}
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeDefaultStake: (stake: string) => dispatch(changeDefaultStake(stake)),
        setBetError: (typeOfError: string, id: number | string) => dispatch(setBetError(typeOfError, id))
    }
}

export default connect(
    ({betSlip}: IStore) => ({
        betSlip
    }),
    mapDispatchToProps
)(BetSlipHeader);