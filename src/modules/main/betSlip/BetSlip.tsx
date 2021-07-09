import React, {FC, useEffect, useRef, useState} from 'react';
import "./betSlip.css"
import SelectedBets from "./selectedBets/SelectedBets";
import {connect} from "react-redux";
import {IStore} from "../../../index";
import {IStateBetSlip} from "./betSlipReducer";
import {IDeviceInfo} from "../../bets/deviceInfo";
import {changeTotalBet, sendBetsData} from "./actions";
import {classList, platform_token, url} from "../../../core/constants";
import {IBetsState} from "../../bets/betsReducer";
import Panel from "../run/panel/Panel";
import Button from "../run/panel/button/Button";
import RequestModel from "../../../models/RequestModel";
import {IActiveWindow} from "../activeWiindowReducer";

interface Props {
    betSlip: IStateBetSlip;
    deviceInfo: IDeviceInfo;
    changeTotalBet: Function;
    sendBetsData: Function;
    bets: IBetsState;
    eventId: number;
    activeWindow: IActiveWindow;
}

const BetSlip: FC<Props> = ({betSlip, deviceInfo, sendBetsData, activeWindow}) => {
    const betsLength = betSlip.selectedBets.length;
    const betSlipWrapper = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLElement>(null);
    const [isOpened, setBetSlipOpen] = useState<boolean>(false);

    useEffect(() => {
        // @ts-ignore
        mainRef.current = document.getElementsByTagName("main")[0];
        handleTransitionend();
        betSlipWrapper.current?.addEventListener("transitionend", handleTransitionend);
        return () => {
            betSlipWrapper.current?.removeEventListener("transitionend", handleTransitionend);
        }
    }, [])

    useEffect(() => {
        if (betSlip.selectedBets.length === 0) {
            setBetSlipOpen(false);
        }
    }, [betSlip.selectedBets.length])


    // if (betSlipWrapper.current?.classList.contains("bet-slip-btn-show")) {mainRef.current.style.paddingBottom = "71"}
    // if (betSlipWrapper.current?.className === "bet-slip") {mainRef.current.style.paddingBottom = "0"}
    // mainRef.current.style.paddingBottom = `${betSlipWrapper.current?.scrollHeight}px`;
    const handleTransitionend = () => {
        if (mainRef.current && !deviceInfo.isDesktop) {
            mainRef.current.style.paddingBottom = `${betSlipWrapper.current?.scrollHeight}px`;
            if (betSlipWrapper.current?.className === "bet-slip") mainRef.current.style.paddingBottom = `0`;
        }
    }

    return (
        <div
            ref={betSlipWrapper}
            className={classList([
                "bet-slip",
                activeWindow === "Run" && "hide",
                // isMaxMaxError && "error-max-max",
                (betsLength && (deviceInfo?.isDesktop || isOpened)) && "opened", // show bet slip area
                (betsLength && betsLength <= 2 && !isOpened) && "mini", // show 2 bets on mob in the bottom
                (betsLength > 2 && !isOpened) && "bet-slip-btn-show" // show "bet slip" btn
            ])}
        >
            <div className="selected-bets">
                <SelectedBets
                    isOpened={isOpened}
                    handleTransitionend={handleTransitionend}
                    setBetSlipOpen={setBetSlipOpen}
                />
            </div>
            <Panel>
                <Button
                    className="coupon-btn" text="Bet Slip" callback={() => setBetSlipOpen(true)} selectedBetsCounter={true}/>
                <Button className="start-match-btn" text="Start Match!" calcPossibleWinInfo={true} calcTotalBet={true}
                        callback={() => sendBetsData()}/>
            </Panel>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeTotalBet: (totalBet: number) => dispatch(changeTotalBet(totalBet)),
        sendBetsData: () => dispatch(sendBetsData())
    }
}

export default connect(
    ({betSlip, bets, deviceInfo, userBalance, activeWindowReducer}: IStore) => ({
        betSlip,
        deviceInfo,
        userBalance,
        bets,
        eventId: betSlip.eventId,
        activeWindow: activeWindowReducer.activeWindow

    }),
    mapDispatchToProps
)(BetSlip);