import React, {ComponentType, FC, useEffect, useRef} from 'react';
import "./result.css";
import {connect, Matching} from "react-redux";
import {IStore} from "../../../index";
import PlacedBets from "../run/placedBets/PlacedBets";
import Panel from "../run/panel/Panel";
import Button from "../run/panel/button/Button";
import {IActiveWindow} from "../activeWiindowReducer";
import {classList} from "../../../core/constants";
import RequestModel from "../../../models/RequestModel";
import {setActiveTeams, setStatistics} from "../headerOfTeams/actions";
import {setBets} from "../../bets/actions";
import {setEventId} from "../betSlip/actions";
import {setPreviewData, switchWindow} from "../actions";
import {IEventWinBets, TEventTotalScore} from "../types/EventTypes";
import {IPreviewData} from "../mainReducer";
import {removeResultData} from "./actions";
import {IDeviceInfo} from "../../bets/deviceInfo";
import YouWonSvg from "./YouWonSVG";
import Team from "../headerOfTeams/team/Team";
import {ITeamsState} from "../headerOfTeams/teamsInfo";
import DetailScores from "./detailScores/DetailScores";
import {IDetailScores} from "./winBetsReducer";

export interface Props {
    activeWindow: IActiveWindow;
    setEventId: Function;
    setActiveTeams: Function;
    setStatistics: Function;
    setBets: Function;
    switchWindow: Function;
    winBets: IEventWinBets;
    setPreviewData: Function;
    removeResultData: Function;
    deviceInfo: IDeviceInfo;
    firstTeamId: number;
    lastTeamId: number;
    teamsInfo: ITeamsState;
    totalScore: TEventTotalScore;
    detailScores: IDetailScores
}

const Result: ComponentType<Matching<Props, any>> = ({firstTeamId, detailScores, teamsInfo, lastTeamId, activeWindow, totalScore, deviceInfo, winBets, switchWindow, setEventId, removeResultData, setActiveTeams, setStatistics, setBets, setPreviewData}) => {

    const resultRef = useRef<HTMLDivElement>(null);
    const transformRef = useRef<number>(100);

    const firstTeam = teamsInfo.teams[firstTeamId];
    const lastTeam = teamsInfo.teams[lastTeamId];

    const anim = () => {
        activeWindow === "Result" ? transformRef.current -= 4 : transformRef.current -= 4;
        resultRef.current && (resultRef.current.style["transform"] = `translateX(${transformRef.current}%)`);

        if (activeWindow === "Result" ? transformRef.current > 0 : transformRef.current < 0 && transformRef.current > -100) {
            requestAnimationFrame(anim)
        } else {
            activeWindow !== "Result" && activeWindow !== "Run" && removeResultData();
        }
    }

    useEffect(() => {
        anim()
    }, [activeWindow])


    return (
        <div
            ref={resultRef}
            className="result">
            <div className="screen-content">
                <div className={classList(["match-result", winBets.length === 0 && "mb"])}>
                    <svg className={classList(["result-trapezoid", winBets.length === 0 && "bt"])} width="190" height="27" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 190 27">
                        <polygon points="0 0 22.5 27 167.5 27 190 0" fill="#26282B"/>
                        <text color="white" x="44" y="16" fill="#E3E3E3" fontSize="14" fontWeight="500">MATCH RESULT
                        </text>
                    </svg>
                    <svg className={classList(["sub-trapezoid", winBets.length === 0 && "bt"])} width="86" height="6" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 86 6">
                        <polygon points="0 6 5 0 81 0 86 6" fill="#EB460C"/>
                    </svg>

                    <div className="first-team">
                        <Team team={firstTeam} sideOfShadow="left" winner={totalScore[0] > totalScore[1]}/>
                    </div>
                    <div className="center">
                        <div className="score">{`${totalScore[0]} : ${totalScore[1]}`}</div>
                        <DetailScores detailScores={detailScores}/>
                    </div>
                    <div className="last-team">
                        <Team team={lastTeam} sideOfShadow="right" winner={totalScore[0] < totalScore[1]}/>
                    </div>
                </div>


                <div className="aside">
                    {
                        deviceInfo.isDesktop ? winBets && Object.keys(winBets).length > 0 && <YouWonSvg/> :
                            winBets && Object.keys(winBets).length > 0 && <div className="bets-head">
                                <span>Bet</span>
                                <div>
                                    <svg className="main-trapezoid" width="173.53" height="25"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 173.53 25">
                                        <polygon points="0 0 20.833333333333336 25 152.69666666666666 25 173.53 0"
                                                 fill="#EB460C"/>
                                        <text x="48" y="18" fill="#ffffff">You Won!</text>
                                    </svg>
                                </div>
                                <span>Win</span>
                            </div>
                    }
                    {Object.keys(winBets).length >= 1 && <PlacedBets isAmount={false} placedBets={Object.values(winBets)}/>}
                    <Panel>
                        <div className="trapezoid">
                            <svg className="main-trapezoid" width="178" height="17"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 178 17">
                                <polygon points="0 17 14.166666666666668 0 163.83333333333334 0 178 17"
                                         fill="#000000"/>
                                <text x="17" y="14" fontFamily="Rubik" fill="#858585" fontSize="11"
                                      fontWeight="500">NEW
                                    MATCH - SAME TEAMS
                                </text>
                            </svg>
                        </div>
                        <Button className="rebet-btn rebet-btn-first" text="Rebet" isRebet={true}/>
                        <Button className="rebet-btn" text="Rebet X2" isRebet={true}/>
                        <Button className="next-match-btn" text="Next Match"
                                callback={() => RequestModel.getNextTeams()
                                    .then(data => {
                                        setEventId(data.data.id)
                                        setActiveTeams(data.data.assets)
                                        setStatistics(data.data.statistics);
                                        setBets(data.data.bets);
                                        setPreviewData(data.data);
                                    })
                                    .then(() => switchWindow("Preview"))}
                        />

                    </Panel>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setEventId: (id: number) => dispatch(setEventId(id)),
        setActiveTeams: (teams: Object) => dispatch(setActiveTeams(teams)),
        setStatistics: (statistics: Object) => dispatch(setStatistics(statistics)),
        setBets: (bets: Object) => dispatch(setBets(bets)),
        switchWindow: (value: string) => dispatch(switchWindow(value)),
        setPreviewData: (data: IPreviewData) => dispatch(setPreviewData(data)),
        removeResultData: () => dispatch(removeResultData())
    }
}

export default connect(
    ({activeWindowReducer, mainReducer, deviceInfo, teamsInfo}: IStore) => ({
        activeWindow: activeWindowReducer.activeWindow,
        winBets: mainReducer.resultData?.winBets.bets,
        deviceInfo,
        teamsInfo,
        firstTeamId: mainReducer.resultData?.assets[0].id,
        lastTeamId: mainReducer.resultData?.assets[1].id,
        totalScore: mainReducer.resultData?.totalScore,
        detailScores: mainReducer.resultData?.detailScores
    }),
    mapDispatchToProps
)(Result);