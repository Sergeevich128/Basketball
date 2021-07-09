import React, {ComponentType, FC, useEffect, useRef, useState} from 'react';
import {classList} from "../../../core/constants";
import ChangeMatch from "../headerOfTeams/sliderChangeMatch/ChangeMatch";
import Team from "../headerOfTeams/team/Team";
import Last from "../headerOfTeams/last/Last";
import Statistics from "../headerOfTeams/statistics/Statistics";
import LastResults from "../headerOfTeams/lastResults/LastResults";
import AdvancedButton from "../headerOfTeams/advancedBtn/AdvancedButton";
import AdvancedStatistics from "../headerOfTeams/advancedStatistics/AdvancedStatistics";
import TeamBets from "../../bets/TeamBets/TeamBets";
import Bets from "../../bets/Bets";
import BetSlip from "../betSlip/BetSlip";
import RequestModel from "../../../models/RequestModel";
import {IDeviceInfo} from "../../bets/deviceInfo";
import {ITeamsState} from "../headerOfTeams/teamsInfo";
import {
    changeDefaultStake,
    clearSelectedBets,
    removePreviewData,
    removeSelectedBet,
    setEventId
} from "../betSlip/actions";
import {setActiveTeams, setStatistics} from "../headerOfTeams/actions";
import {setBets} from "../../bets/actions";
import {connect, Matching} from "react-redux";
import {IStore} from "../../../index";
import "./preview.css"
import {IActiveWindow} from "../activeWiindowReducer";
import {TEventAdvancedStatistics, TEventLastResults} from "../types/EventTypes";
import ReturnContent from "../ReturnContent";
import SimpleBar from "simplebar-react";

interface Props {
    deviceInfo: IDeviceInfo;
    setActiveTeams: Function;
    setStatistics: Function;
    removeSelectedBet: Function;
    setBets: Function;
    teamsInfo: ITeamsState;
    setEventId: Function;
    activeWindow: IActiveWindow;
    removePreviewData: Function;
    advancedStatistics: TEventAdvancedStatistics;
    lastResults: TEventLastResults;
    clearSelectedBets: Function;
}

const Preview: ComponentType<Matching<Props, any>> = ({teamsInfo, clearSelectedBets, setStatistics, setActiveTeams, advancedStatistics, lastResults, removePreviewData, deviceInfo, setBets, removeSelectedBet, setEventId, activeWindow}) => {

    const headerOfTeamsRef = useRef<HTMLDivElement>(null);
    let canSwitch = false;
    const [isSwitchTeams, setSwitchTeamsClass] = useState<boolean>(false);
    const [isLastResults, setIsLastResults] = useState<boolean>(false);
    const [isStatistics, setStaticsClass] = useState<boolean>(false);
    const previewRef = useRef<HTMLDivElement>(null);

    const transformRef = useRef<number>(100);


    const anim1 = () => {
        transformRef.current -= 4;
        previewRef.current && (previewRef.current.style["transform"] = `translateX(${transformRef.current}%)`)

        if (transformRef.current > 0) {
            requestAnimationFrame(anim1)
        }
    }

    const anim2 = () => {
        transformRef.current -= 4;
        previewRef.current && (previewRef.current.style["transform"] = `translateX(${transformRef.current}%)`)

        if (transformRef.current < 0 && transformRef.current > -100) {
            requestAnimationFrame(anim2)
        } else {
            activeWindow !== "Preview" && removePreviewData() && clearSelectedBets();
        }
    }

    useEffect(() => {
        const intervalID = window.setInterval(() => {
            setIsLastResults((isOld) => !isOld)
        }, 4000)
        return () => {
            clearInterval(intervalID);
        }
    }, []);

    useEffect(() => {
        if (activeWindow === "Preview") {
            anim1()
        } else if (activeWindow === "Run") {
            anim2()
        }
    }, [activeWindow])

    if (isSwitchTeams) {
        setTimeout(() => {
            setSwitchTeamsClass(false)
        }, 500)
    }

    setTimeout(() => {
        canSwitch = true
    }, 1000)

    const changeTeams = (isNext: boolean) => {
        if (canSwitch) {
            setSwitchTeamsClass(true)
            removeSelectedBet(-1);
            const model = isNext ? RequestModel.getNextTeams() : RequestModel.getPrevTeams();

            setTimeout(() => {
                model.then(data => {
                    setActiveTeams(data.data.assets)
                    setStatistics(data.data.statistics);
                    setBets(data.data.bets);
                    setEventId(data.data.id)
                })
            }, 200)
        }
    }

    const showAdvancedStatistics = () => {
        isStatistics ? setStaticsClass(false) : setStaticsClass(true);
    }

    const firstTeam = teamsInfo.teams[teamsInfo.activeTeams[0]];
    const lastTeam = teamsInfo.teams[teamsInfo.activeTeams[1]];

    const content = <>
        <div ref={headerOfTeamsRef} className={classList([
            "header-of-teams",
            isStatistics && "show-statistics",
            isLastResults && "last-results-visible",
            isSwitchTeams && "switch-teams",
        ])}>
            <ChangeMatch changeNext={() => changeTeams(true)} changePrev={() => changeTeams(false)}/>
            <div className="teams">
                <Team sideOfShadow="left" team={firstTeam}/>
                <Team sideOfShadow="right" team={lastTeam}/>
            </div>
            <Last/>
            <div className="statistics">
                <Statistics strength={firstTeam?.strength}/>
                <Statistics strength={lastTeam?.strength}/>
            </div>
            <LastResults lastResults={lastResults}/>
            <AdvancedButton showAdvancedStatistics={showAdvancedStatistics}/>
            <div className={classList(["advanced-statistics-wrapper", !deviceInfo.isDesktop && "mobile"])}>
                <AdvancedStatistics statistics={advancedStatistics[0]}/>
                <AdvancedStatistics statistics={advancedStatistics[1]}/>
            </div>
            <TeamBets firstTeam={firstTeam && firstTeam.name} lastTeam={lastTeam && lastTeam.name}/>
        </div>
        <div className="bets-zone">
            <Bets/>
            {deviceInfo.isDesktop ? <BetSlip/> : null}
        </div>
    </>
    return (
        deviceInfo.isDesktop ?
            <div
                ref={previewRef}
                className={classList([
                    "preview",
                    // activeWindow !== "Preview" && "fade"
                ])}
            >
                <SimpleBar style={{height: window.innerHeight - 64}} autoHide={false}>
                    <div className="preview-wrapper">
                        {content}
                    </div>
                </SimpleBar>
            </div>
            :
            <div
                ref={previewRef}
                className={classList([
                    "preview",
                    // activeWindow !== "Preview" && "fade"
                ])}
            >
                {content}
            </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setActiveTeams: (teams: Object) => dispatch(setActiveTeams(teams)),
        removeSelectedBet: (id: number) => dispatch(removeSelectedBet(id)),
        setStatistics: (lastResults: Array<[number]>) => dispatch(setStatistics(lastResults)),
        setBets: (bets: Object) => dispatch(setBets(bets)),
        setEventId: (id: number) => dispatch(setEventId(id)),
        removePreviewData: () => dispatch(removePreviewData()),
        clearSelectedBets: () => dispatch(clearSelectedBets()),
    }
}

export default connect(
    ({teamsInfo, deviceInfo, activeWindowReducer, mainReducer}: IStore) => ({
        deviceInfo,
        teamsInfo,
        activeWindow: activeWindowReducer.activeWindow,
        advancedStatistics: mainReducer.previewData?.statistics.advanced,
        lastResults: mainReducer.previewData?.statistics.lastResults,
        teams: mainReducer.previewData?.assets
    }),
    mapDispatchToProps
)(Preview);