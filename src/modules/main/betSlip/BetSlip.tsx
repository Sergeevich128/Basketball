import React, {FC, useEffect, useRef, useState} from 'react';
import "./betSlip.css"
import SelectedBets from "./selectedBets/SelectedBets";
import {connect} from "react-redux";
import {IStore} from "../../../index";
import {IStateBetSlip} from "./betSlipReducer";
import {IDeviceInfo} from "../../bets/deviceInfo";
import BetSlipBtns from "./betSlipBtns/betSlipBtns";
import {changeTotalBet} from "./actions";
import {classList} from "../../../core/constants";
import {IBetsState} from "../../bets/betsReducer";

interface Props {
    betSlip: IStateBetSlip;
    deviceInfo: IDeviceInfo;
    changeTotalBet: Function;
    bets: IBetsState;
}

const BetSlip: FC<Props> = ({betSlip, deviceInfo, bets, changeTotalBet}) => {
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
                    // isMaxMaxError && "error-max-max",
                    (betsLength && (deviceInfo?.isDesktop || isOpened)) && "opened", // show bet slip area
                    (betsLength && betsLength <= 2 && !isOpened) && "mini", // show 2 bets on mob in the bottom
                    (betsLength > 2 && !isOpened) && "bet-slip-btn-show" // show "bet slip" btn
                ])}
            >
                <div className="selected-bets">
                    <SelectedBets
                        isOpened={isOpened}
                        setBetSlipOpen={setBetSlipOpen}
                        handleTransitionend={handleTransitionend}
                    />
                </div>
                <BetSlipBtns
                    setBetSlipOpen={setBetSlipOpen}
                />

            </div>
        );
    };

    const mapDispatchToProps = (dispatch: any) => {
        return {
            changeTotalBet: (totalBet: number) => dispatch(changeTotalBet(totalBet)),
        }
    }

    export default connect(
        ({betSlip, bets, deviceInfo, userBalance}: IStore) => ({
            betSlip,
            deviceInfo,
            userBalance,
            bets
        }),
        mapDispatchToProps
    )(BetSlip);