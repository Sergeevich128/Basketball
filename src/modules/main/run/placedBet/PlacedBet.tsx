import React, {FC} from 'react';
import "./placedBet.css";
import {ITeamsState} from "../../headerOfTeams/teamsInfo";
import {connect} from "react-redux";
import {IStore} from "../../../../index";
import {IDeviceInfo} from "../../../bets/deviceInfo";
import {IActiveWindow} from "../../activeWiindowReducer";

interface Props {
    betName: any;
    amount?: any;
    potential: any;
    teamsInfo: ITeamsState;
    deviceInfo: IDeviceInfo;
    activeWindow: IActiveWindow;
}

const PlacedBet:FC<Props> = ({teamsInfo, betName, amount, potential, deviceInfo, activeWindow}) => {
    if (betName.subGroup === "{homeTeam}") {
        betName.subGroup = teamsInfo.teams[teamsInfo.activeTeams[0]].name;
    } else if (betName.subGroup === "{awayTeam}") {
        betName.subGroup = teamsInfo.teams[teamsInfo.activeTeams[1]].name;
    }

    return (
        <div className="placed-bet">
            <div>
                <span>{betName.group}</span>
                <span>{betName.subGroup} ({betName.value})</span>
            </div>
            {amount && <div className="amount">{amount.display}</div>}
            <div className="est">{deviceInfo.isDesktop && activeWindow === "Run"? `Est: ${potential.display}` : potential.display}</div>

        </div>
    );
};

export default connect(
    ({teamsInfo, deviceInfo, activeWindowReducer}: IStore) => ({teamsInfo, deviceInfo, activeWindow: activeWindowReducer.activeWindow})
)(PlacedBet);