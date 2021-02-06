import React, {FC, useEffect, useRef, useState} from 'react';
import SelectedBetInput from "./selectedBetInput/SelectedBetInput";
import StakeAccordion from "../stakeAccordion/StakeAccordion";
import {ISelectedBet} from "../betSlip";
import {changeInputStake} from "../actions";
import {connect} from "react-redux";

interface Props {
  selectedBet: ISelectedBet;
  removeBet: Function;
  changeInputStake?: Function;
}

const SelectedBet: FC<Props> = ({selectedBet, removeBet, changeInputStake}) => {
  const keyboardRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const selectedBetRef = useRef<HTMLDivElement>(null);

  const [isFocus, setIsFocus] = useState(false);

  let onStakeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeInputStake && changeInputStake(event.currentTarget?.value, selectedBet.id);
  }

  const showStakeAccordion = () => {
    setIsFocus(true)
  }

  const handleOutsideClick: any = (event: Event) => {
    // let fastStake = keyboardRef.current?.getElementsByClassName("fastStake")[0];
    // let confirm: any = keyboardRef.current?.getElementsByClassName("confirm")[0];
    // let keyboardClicks = 0;
    if (
      (inputRef.current && !inputRef.current.contains(event.target as Node)) &&
      (keyboardRef.current && !keyboardRef.current.contains(event.target as Node))
    ) {
      setIsFocus(false)
      // confirm.classList.remove("active")
    }
    // else if (inputRef.current && !inputRef.current.contains(event.target as Node) &&
    //   (confirm && !confirm.contains(event.target as Node))) {
    //   keyboardClicks++
    //   if (keyboardClicks >= 1) {
    //     confirm?.classList.add('active')
    //   }
    // }
    // else if (confirm.classList.contains("active") && event.target === confirm) {
    //   setIsFocus(false);
    //   confirm.classList.remove('active')
    // }
  }


  useEffect(() => {
    document.addEventListener("click", handleOutsideClick)
    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [])

  const classList = [
    "selected-bet-wrapper",
    isFocus && "show-keyboard",
  ].filter(Boolean).join(" ");

  return (
    <div
      className={classList}
      onClick={handleOutsideClick}
      ref={selectedBetRef}
    >
      <div className="selected-bet">
        <div>
          <h6>{selectedBet.groupName}</h6>
          <h5>{selectedBet.subgroupName} ({selectedBet.name})<span>@{selectedBet.odd}</span></h5>
        </div>
        <div>
          <div>
            <SelectedBetInput
              // @ts-ignore
              ref={inputRef}
              selectedBet={selectedBet}
              onStakeChange={onStakeChange}
              showStakeAccordion={showStakeAccordion}
              value={selectedBet.value}
            />
            <div onClick={() => removeBet(selectedBet.id)} className="remove-selected-bet"/>
          </div>
          <span className="possible-win">Est.:{(selectedBet.value * selectedBet.odd).toFixed(2)}</span>
        </div>
      </div>
      <StakeAccordion
        // @ts-ignore
        ref={keyboardRef}
        betId={selectedBet.id}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeInputStake: (stake: number, id: number) => dispatch(changeInputStake(stake, id)),
  }
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(SelectedBet);