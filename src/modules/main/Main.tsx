import React, {FC, useEffect, useRef, useState} from 'react';
import './main..css'
import SimpleBar from "simplebar-react";
import {connect} from 'react-redux';
import {IStore} from "../../index";
import {classList, platform_token, requestData} from "../../core/constants"
import {changeDefaultStake, removeSelectedBet} from "./betSlip/actions";
import Bets from "../bets/Bets";
import Team from "./headerOfTeams/team/Team";
import TeamBets from "../bets/TeamBets/TeamBets";
import ChangeMatch from "./headerOfTeams/sliderChangeMatch/ChangeMatch";
import {ITeamsState} from "./headerOfTeams/teamsInfo";
import AdvancedButton from "./headerOfTeams/advancedBtn/AdvancedButton";
import LastResults from "./headerOfTeams/lastResults/LastResults";
import Last from "./headerOfTeams/last/Last";
import {setActiveTeams, setStatistics} from "./headerOfTeams/actions";
import {IDeviceInfo} from "../bets/deviceInfo";
import BetSlip from "./betSlip/BetSlip";
import Statistics from "./headerOfTeams/statistics/Statistics";
import AdvancedStatistics from "./headerOfTeams/advancedStatistics/AdvancedStatistics";
import {setBets} from "../bets/actions";

interface Props {
    deviceInfo: IDeviceInfo;
    setActiveTeams: Function;
    setStatistics: Function;
    removeSelectedBet: Function;
    setBets: Function;
    teamsInfo: ITeamsState;
}

const Main: FC<Props> = ({teamsInfo,setStatistics,setActiveTeams, deviceInfo, setBets, removeSelectedBet}) => {

    const headerOfTeamsRef = useRef<HTMLDivElement>(null);

    let canSwitch = false;
    const [isSwitchTeams, setSwitchTeamsClass] = useState<boolean>(false);
    const [isLastResults, setIsLastResults] = useState<boolean>(false);
    const [isStatistics, setStaticsClass] = useState<boolean>(false);

    useEffect(() => {
        const intervalID = window.setInterval(() => {
            setIsLastResults((isOld) => !isOld)
        }, 4000)
        return () => clearInterval(intervalID)
    }, []);

    if (isSwitchTeams) {
        setTimeout(() => {
            setSwitchTeamsClass(false)
        }, 500)
    }

    setTimeout(() => {
        canSwitch = true
    }, 1000)

    const changePrev = () => {
            if (canSwitch) {
                setSwitchTeamsClass(true)
                removeSelectedBet(-1);

                setTimeout(() => {
                    requestData(`https://qa-virtuals-kyt_bask2.leap-gaming.com/virtualBasketballInstant/game/newEvent?rebet=0&platform_token=${platform_token}`)
                        .then(data => {
                            setActiveTeams(data.data.assets)
                            setStatistics(data.data.statistics);
                            setBets(data.data.bets);
                        })
                }, 200)
            }
    }

    const changeNext = () => {
        if (canSwitch) {
            setSwitchTeamsClass(true);
            removeSelectedBet(-1);

            setTimeout(() => {
                requestData(`https://qa-virtuals-kyt_bask2.leap-gaming.com/virtualBasketballInstant/game/newEvent?rebet=-1&platform_token=${platform_token}`)
                    .then(data => {
                        setActiveTeams(data.data.assets)
                        setStatistics(data.data.statistics);
                        setBets(data.data.bets);
                    })
            }, 200)
        }
    }

    const showAdvancedStatistics = () => {
        isStatistics ? setStaticsClass(false) : setStaticsClass(true);
    }

    const content = <>
        <main>

            <div ref={headerOfTeamsRef} className={classList([
                "header-of-teams",
                isStatistics && "show-statistics",
                isLastResults && "last-results-visible",
                isSwitchTeams && "switch-teams",
            ])}>
                <ChangeMatch changeNext={changeNext} changePrev={changePrev}/>
                <div className="teams">
                    <Team sideOfShadow="left" team={teamsInfo.teams[teamsInfo.activeTeams[0]]}/>
                    <Team sideOfShadow="right" team={teamsInfo.teams[teamsInfo.activeTeams[1]]}/>
                </div>
                <Last/>
                <div className="statistics">
                    <Statistics strength={teamsInfo.teams[teamsInfo.activeTeams[0]]?.strength}/>
                    <Statistics strength={teamsInfo.teams[teamsInfo.activeTeams[1]]?.strength}/>
                </div>
                <LastResults lastResults={teamsInfo.lastResults}/>
                <AdvancedButton showAdvancedStatistics={showAdvancedStatistics}/>
                <div className={classList(["advanced-statistics-wrapper", !deviceInfo.isDesktop && "mobile"])}>
                    <AdvancedStatistics statistics={teamsInfo.advancedStatistics[0]}/>
                    <AdvancedStatistics statistics={teamsInfo.advancedStatistics[1]}/>
                </div>
                <TeamBets/>
            </div>
            <div className="bets-zone">
                <Bets/>
                {deviceInfo.isDesktop ? <BetSlip/> : null}
            </div>
        </main>
    </>

    return (
        <>
            {deviceInfo.isDesktop ?
                <SimpleBar style={{height: window.innerHeight}} autoHide={false}>
                    {content}
                </SimpleBar> :
                content
            }
        </>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeDefaultStake: (stake: any) => dispatch(changeDefaultStake(stake)),
        setActiveTeams: (teams: Object) => dispatch(setActiveTeams(teams)),
        removeSelectedBet: (id: number) => dispatch(removeSelectedBet(id)),
        setStatistics: (lastResults: Array<[number]>) => dispatch(setStatistics(lastResults)),
        setBets: (bets: Object) => dispatch(setBets(bets)),
    }
}

export default connect(
    ({teamsInfo, deviceInfo}: IStore) => ({
        deviceInfo,
        teamsInfo
    }),
    mapDispatchToProps
)(Main);