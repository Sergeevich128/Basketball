import React, {FC, useEffect, useState} from 'react';
import Header from "./modules/header/Header";
import Main from "./modules/main/Main";
import BetSlip from "./modules/main/betSlip/BetSlip";
import {connect} from "react-redux";
import {IStore} from "./index";
import {IDeviceInfo} from "./modules/bets/deviceInfo";
import {setActiveTeams, setStatistics, setTeamsData} from "./modules/main/headerOfTeams/actions";
import {setUserBalance} from "./modules/header/actions";
import {platform_token, requestData} from "./core/constants";
import {setBets, setBetsTemplate} from "./modules/bets/actions";

interface Props {
    deviceInfo: IDeviceInfo;
    setTeamsData: Function;
    setUserBalance: Function;
    setActiveTeams: Function;
    setStatistics: Function;
    setBetsTemplate: Function;
    setBets: Function;
}

const App:FC<Props> = ({deviceInfo, setTeamsData, setUserBalance, setActiveTeams, setStatistics, setBets, setBetsTemplate}) => {
    const [isRender, setValue] = useState<boolean>(false)

    useEffect(() => {
        requestData(`https://qa-virtuals-kyt_bask2.leap-gaming.com/virtualBasketballInstant/game/init?platform_token=${platform_token}`)
            .then((data) => {
                setTeamsData(data.data.assets);
                setUserBalance(data.data.user.balance, data.data.currency);
                setBetsTemplate(data.data.betsTemplate);
            })
            .then(() => setValue(true))

        requestData(`https://qa-virtuals-kyt_bask2.leap-gaming.com/virtualBasketballInstant/game/newEvent?platform_token=${platform_token}`)
            .then((data) => {
                setActiveTeams(data.data.assets);
                setStatistics(data.data.statistics);
                setBets(data.data.bets);
            })
    }, [])

    return (
        <>
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
    }
}

export default connect(
    ({deviceInfo}: IStore) => ({deviceInfo}),
    mapDispatchToProps
)(App);
