import React, {FC, useRef, useState} from 'react';
import "./betSlip.css"
import BetSlipHeader from "./betSlipHeader/BetSlipHeader";
import SelectedBets from "./selectedBets/SelectedBets";
import {connect} from "react-redux";
import {IStore} from "../../../index";
import {ISelectedBet, IStateBetSlip} from "./betSlipReducer";

interface Props {
  betSlip: IStateBetSlip;
}

const BetSlip: FC<Props> = ({betSlip}) => {
  const betsLength = betSlip.selectedBets.length
  const betSlipWrapper = useRef<HTMLDivElement>(null);
  const [isOpened, setBetSlipOpen] = useState<boolean>(false);

  const classList = [
    "bet-slip",
    (isOpened && betsLength) && "opened",
    (betsLength && betsLength <= 2 && !isOpened) && "mini",
    (betsLength > 2 && !isOpened) && "bet-slip-btn-show"
  ].filter(Boolean).join(" ");

  let sumSelectedBetsValue = 0;
  let possibleWin = 0;

  const header = document.getElementsByTagName("header")[0];

  if (isOpened) {
    header?.classList.add("sticky")
  } else {
    header?.classList.remove("sticky")
  }

  const selectedBetsValue = () => {
    betSlip.selectedBets.map((selectedBet: ISelectedBet) => {
      return sumSelectedBetsValue += +selectedBet.value
    })
  }

  const calcPossibleWin = () => {
    betSlip.selectedBets.map((selectedBet: ISelectedBet) => {
      return possibleWin += +(selectedBet.value * selectedBet.odd).toFixed(2);
    })
  }

  selectedBetsValue()
  calcPossibleWin()

  return (
    <div
      ref={betSlipWrapper}
      className={classList}
    >
        <BetSlipHeader>
          <div
            className="remove-selected-bet"
            onClick={() => setBetSlipOpen(false)}
          />
        </BetSlipHeader>
      <div className="selected-bets">
        <SelectedBets
          setBetSlipOpen={setBetSlipOpen}
        />
      </div>
      <div className="bet-slip-btns">
        <div onClick={() => setBetSlipOpen(true)}>
          <span className="selected-bets-counter">{betSlip.selectedBets.length}</span>Bet Slip
        </div>
        <button>
          <div className="start-match">Start Match!</div>
          <div>
            <span className="total-bet-info">Total Bet: FUN {sumSelectedBetsValue}</span>
            <span className="possible-win-info">Est.: FUN {possibleWin.toFixed(2)}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default connect(
  ({betSlip}: IStore) => ({
    betSlip
  }),
)(BetSlip);