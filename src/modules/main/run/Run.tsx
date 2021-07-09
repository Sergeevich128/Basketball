import React, {FC, useEffect, useRef, useState} from "react";
import "./run.css"
import {connect} from "react-redux";
import {IStore} from "../../../index";
import PlacedBets from "./placedBets/PlacedBets";
import Panel from "./panel/Panel";
import Button from "./panel/button/Button";
import ScoreBoard from "./scoreboard/ScoreBoard";
import {IActiveWindow} from "../activeWiindowReducer";
import {classList} from "../../../core/constants";
import {removeRunData, requireResultData} from "./actions";
import {IEventPlacedBet} from "../types/EventTypes";
import deviceInfo, {IDeviceInfo} from "../../bets/deviceInfo";

export interface Props {
    activeWindow: IActiveWindow;
    eventId: number;
    requireResultData: Function;
    placedBets: IEventPlacedBet[];
    removeRunData: Function;
    deviceInfo: IDeviceInfo;
}

const Run: FC<Props> = ({activeWindow, requireResultData, placedBets, removeRunData, deviceInfo}) => {
    const runRef = useRef<HTMLDivElement>(null);


    const transformRef = useRef<number>(100);


    const anim = () => {
        activeWindow === "Run" ? transformRef.current -= 4 : transformRef.current -= 4;
        runRef.current && (runRef.current.style["transform"] = `translateX(${transformRef.current}%)`)

        if (activeWindow === "Run" ? transformRef.current > 0 : transformRef.current < 0 && transformRef.current > -100) {
            requestAnimationFrame(anim)
        } else {
            activeWindow !== "Run" && activeWindow !== "Preview" && removeRunData();
        }
    }

    useEffect(() => {
        anim()
    }, [activeWindow])

    return (
        <div
            ref={runRef}
            className={classList([
                "run",
                // activeWindow !== "Run" && "fade"
            ])}>
            <div className="screen-content">
                <div className="video-container">
                    <ScoreBoard/>
                </div>
                <div className="aside">
                    <div className="placed-bets">
                        <div className="bets-head">
                            {deviceInfo.isDesktop ?
                                <span>My bets</span> :
                                <>
                                    <span>Bet</span>
                                    <span>Amount</span>
                                    <span>Est.</span>
                                </>
                            }

                        </div>
                        {<PlacedBets isAmount={true} placedBets={placedBets}/>}
                    </div>
                    <Panel>
                        <Button className={"skip"} text={"Skip\nQuarter"}/>
                        <Button className={"outcome"} text="Go to outcome" callback={() => requireResultData()}/>
                    </Panel>

                </div>
            </div>

        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        requireResultData: () => dispatch(requireResultData()),
        removeRunData: () => dispatch(removeRunData()),
    }
}

export default connect(
    ({activeWindowReducer, betSlip, mainReducer, deviceInfo}: IStore) => ({
        activeWindow: activeWindowReducer.activeWindow,
        eventId: betSlip.eventId,
        deviceInfo
        // placedBets: mainReducer.runData?.placedBets
    }),
    mapDispatchToProps
)(Run);