import React, {FC, ForwardedRef} from 'react';
import "./StakeAccordion.css"
import {connect} from "react-redux";
import {IStore} from "../../../index";
import {IStateBetSlip} from "../betSlip";
import {changeInputStake, changeDefaultStake, changeFastStake, removeLastNum} from "../actions";

const keyboardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

interface Props {
  betSlip: IStateBetSlip;
  changeInputStake: Function;
  betId?: number;
  callback?: Function;
  changeFastStake: Function;
  removeLastNum: Function;
}

const StakeAccordion: FC<Props> = React.forwardRef(({betSlip, changeInputStake, changeFastStake, removeLastNum, betId, callback}, ref: ForwardedRef<HTMLDivElement>) => {
  const handleDefaultStake = (stake: any): void => {
    if (betId) {
      changeInputStake(stake, betId);
    } else if (callback) {
      callback(stake)
    }
  }

  const handleClass = () => {
    return ""
  }

  return (
    <div
      className="stake-accordion"
      ref={ref}
    >
      <div className="fastStake">
        {betSlip.fastStakesValue.map((stake, index) => <span
          key={index}
          onMouseDown={() => changeFastStake(stake, betId)}
        >
          {stake}
        </span>)}
      </div>
      <div className="keyboard">
        {keyboardValues.map((num: number, index) => {
          return <span className="num" key={index} onClick={() =>handleDefaultStake(num)}>{num}</span>
        })}
        <div className="dot"/>
        <div className="back-btn" onClick={() => removeLastNum(betId)}>
          <svg width="35" height="22" viewBox="0 0 35 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M10.0948 3L4.40473 11L10.0948 19H30.7271V3H10.0948ZM8.95452 21L2 11L8.95452 1H32.7726V21H8.95452Z"
                  fill="#595959"/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M18.2767 11.3496L13.9866 7.10274L15.4418 5.69727L19.7142 9.92656L23.9866 5.69727L25.4419 7.10274L21.1517 11.3496L25.4419 15.5964L23.9866 17.0019L19.7142 12.7726L15.4418 17.0019L13.9866 15.5964L18.2767 11.3496Z"
                  fill="#595959"/>
          </svg>
        </div>
        <div className="confirm" onClick={handleClass}>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="svg-confirm" fillRule="evenodd" clipRule="evenodd"
                  d="M12.2579 23C6.12095 23 1.146 18.0751 1.146 12C1.146 5.92487 6.12095 1 12.2579 1C18.3948 1 23.3697 5.92487 23.3697 12C23.3697 18.0751 18.3948 23 12.2579 23ZM12.2582 21C17.2793 21 21.3497 16.9706 21.3497 12C21.3497 7.02944 17.2793 3 12.2582 3C7.23704 3 3.16662 7.02944 3.16662 12C3.16662 16.9706 7.23704 21 12.2582 21ZM15.5842 8.29289L10.2375 13.5858L7.92125 11.2929L6.49265 12.7071L10.2375 16.4142L17.0128 9.70711L15.5842 8.29289Z"
                  fill="#595959"/>
          </svg>
        </div>
      </div>
    </div>
  );
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeStake: (stake: number) => dispatch(changeDefaultStake(stake)),
    changeInputStake: (stake: number, id: number) => dispatch(changeInputStake(stake, id)),
    changeFastStake: (stake: number, id: number) => dispatch(changeFastStake(stake, id)),
    removeLastNum: (id: number) => dispatch(removeLastNum(id))
  }
}

export default connect(
  ({betSlip}: IStore) => ({
    betSlip
  }),
  mapDispatchToProps,
  null,
  {forwardRef: true}
)(StakeAccordion);