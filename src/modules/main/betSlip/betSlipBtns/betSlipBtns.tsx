import React, {FC, useEffect, useState} from 'react';
import "./betSlipBtns.css"
import {ISelectedBet, IStateBetSlip} from "../betSlipReducer";
import {connect} from "react-redux";
import {IStore} from "../../../../index";

interface Props {
    betSlip: IStateBetSlip;
    setBetSlipOpen: Function;
}

const BetSlipBtns: FC<Props> = ({betSlip, setBetSlipOpen}) => {
    const calcPossibleWin = (): number => {
        return betSlip.selectedBets.reduce((acc, selectedBet: ISelectedBet) => {
           return acc += +(selectedBet.value * selectedBet.odd).toFixed(2);
        }, 0)
    }

    const [possibleWin, setPossibleWin] = useState<number>(calcPossibleWin());

    useEffect(() => {
        setPossibleWin(calcPossibleWin())
    }, [betSlip.totalBet])



    return (
        <div className="bet-slip-btns">
            <button className="btn-left" onClick={() => setBetSlipOpen(true)}>
                <span className="selected-bets-counter">{betSlip.selectedBets.length}</span>Bet Slip
            </button>
            <button className="btn-right">
                <div className="start-match">Start Match!</div>
                <div>
                    <span className="total-bet-info">Total Bet: FUN {betSlip.totalBet}</span>
                    <span className="possible-win-info">Est.: FUN {possibleWin.toFixed(2)}</span>
                </div>
            </button>
        </div>
    );
};


export default connect(
    ({betSlip}: IStore) => ({
        betSlip,
    }),
)(BetSlipBtns);
