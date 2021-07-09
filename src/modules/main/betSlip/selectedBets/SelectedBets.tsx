import React, {FC} from 'react';
import "./selectedBets.css";
import {connect} from "react-redux";
import {IStateBetSlip} from "../betSlipReducer";
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css';
import {changeInputStake, removeSelectedBet, setBetError} from "../actions";
import SelectedBet from "./selectedBet/SelectedBet";
import {IStore} from "../../../../index";
import {IDeviceInfo} from "../../../bets/deviceInfo";
import BetSlipHeader from "../betSlipHeader/BetSlipHeader";
import {IBalance} from "../../../header/balance/userBalance";

interface Props {
    betSlip: IStateBetSlip;
    removeSelectedBet?: Function;
    setBetSlipOpen: Function;
    deviceInfo: IDeviceInfo;
    setBetError: Function;
    changeInputStake: Function;
    userBalance: IBalance;
    isOpened: boolean;
    handleTransitionend: Function;
}

const SelectedBets: FC<Props> = ({betSlip, deviceInfo, handleTransitionend, userBalance, isOpened,changeInputStake, removeSelectedBet, setBetError, setBetSlipOpen}) => {

    const removeBet = (id: number) => {
        removeSelectedBet && removeSelectedBet(id);
    }

    const selectedBets = betSlip.selectedBets && betSlip.selectedBets.map((selectedBet) =>
        <SelectedBet
            setBetError={setBetError}
            key={selectedBet.id}
            selectedBet={selectedBet}
            removeBet={removeBet}
            changeInputStake={changeInputStake}
            betSlip={betSlip}
            userBalance={userBalance}
            isOpened={isOpened}
            handleTransitionend={handleTransitionend}
            deviceInfo={deviceInfo}
        />);

    const content = <>
        {selectedBets}
        <BetSlipHeader>
            <div
                className="remove-selected-bet"
                onClick={() => setBetSlipOpen(false)}
            />
        </BetSlipHeader>
    </>

    return (<>{
        (betSlip.selectedBets.length > 2 && isOpened || isOpened) || deviceInfo.isDesktop
            ? <SimpleBar className="wrapper-selected-bets" autoHide={false}>
                {content}
            </SimpleBar>
            : <div className="wrapper-selected-bets">
                {content}
            </div>
    }</>);
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeSelectedBet: (id: number) => dispatch(removeSelectedBet(id)),
        setBetError: (typeOfError: string, id: number) => dispatch(setBetError(typeOfError, id)),
        changeInputStake: (stake: string, id: number) => dispatch(changeInputStake(stake, id)),
    }
}

export default connect(
    ({betSlip, deviceInfo, userBalance}: IStore) => ({
        betSlip,
        deviceInfo,
        userBalance
    }), mapDispatchToProps
)(SelectedBets);