import React, {FC, useEffect, useState} from 'react';
import Header from "./modules/header/Header";
import Main from "./modules/main/Main";
import BetSlip from "./modules/main/betSlip/BetSlip";
import {connect} from "react-redux";
import {IStore} from "./index";
import {IDeviceInfo} from "./modules/bets/deviceInfo";
import {setActiveTeams, setStatistics, setTeamsData} from "./modules/main/headerOfTeams/actions";
import {setUserBalance} from "./modules/header/actions";
import {setBets, setBetsTemplate} from "./modules/bets/actions";
import RequestModel from "./models/RequestModel";
import {setEventId} from "./modules/main/betSlip/actions";
import {setPreviewData} from "./modules/main/actions";
import {IMainState, IPreviewData} from "./modules/main/mainReducer";
import {classList} from "./core/constants";
import {IActiveWindow} from "./modules/main/activeWiindowReducer";
import {IWinBet, IWinBetsState} from "./modules/main/results/winBetsReducer";

interface Props {
    deviceInfo: IDeviceInfo;
    activeWindow: IActiveWindow;
    setTeamsData: Function;
    setUserBalance: Function;
    setActiveTeams: Function;
    setStatistics: Function;
    setBetsTemplate: Function;
    setBets: Function;
    setEventId: Function;
    setPreviewData: Function;
    win: boolean;
}

const App: FC<Props> = ({deviceInfo, setEventId, win, setTeamsData, activeWindow, setUserBalance, setActiveTeams, setStatistics, setBets, setBetsTemplate, setPreviewData}) => {
    const [isRender, setValue] = useState<boolean>(false)

    useEffect(() => {
        RequestModel.getInitData()
            .then((data) => {
                setEventId(data.data.id)
                setTeamsData(data.data.assets);
                setUserBalance(data.data.user.balance, data.data.currency);
                setBetsTemplate(data.data.betsTemplate);
            })
            .then(() => {
                RequestModel.getNextTeams()
                    .then((data) => {
                        setEventId(data.data.id)
                        setActiveTeams(data.data.assets);
                        setStatistics(data.data.statistics);
                        setBets(data.data.bets);
                        setPreviewData(data.data)
                    })
                    .then(() => setValue(true))
            })
    }, [])

    return (
        <>
            <div className={classList([
                activeWindow === "Preview" && "up",
                activeWindow === "Run" && "run",
                activeWindow === "Result" && "run",
                win && "win",
                "backgrounds",
            ])}>
                <div className="upBG"/>
                <div className="runBG"/>
                <div className="winBG"/>
            </div>
            {isRender && <Header/>}
            {isRender && <Main/>}
            {!deviceInfo.isDesktop ? <BetSlip/> : null}
        </>
    );
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setTeamsData: (data: Object) => dispatch(setTeamsData(data)),
        setActiveTeams: (teams: Object) => dispatch(setActiveTeams(teams)),
        setStatistics: (statistics: Object) => dispatch(setStatistics(statistics)),
        setBetsTemplate: (betsTemplate: Object) => dispatch(setBetsTemplate(betsTemplate)),
        setBets: (bets: Object) => dispatch(setBets(bets)),
        setUserBalance: (balance: Object, currency: Object) => dispatch(setUserBalance(balance, currency)),
        setEventId: (id: number) => dispatch(setEventId(id)),
        setPreviewData: (data: IPreviewData) => dispatch(setPreviewData(data)),
    }
}

export default connect(
    ({deviceInfo, activeWindowReducer, mainReducer}: IStore) => ({
        deviceInfo,
        activeWindow: activeWindowReducer.activeWindow,
        win: mainReducer.winMatch
    }),
    mapDispatchToProps
)(App);
