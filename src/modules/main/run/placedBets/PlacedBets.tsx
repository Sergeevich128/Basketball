import React, {FC, useEffect} from 'react';
import "./placedBets.css"
import SimpleBar from "simplebar-react";
import PlacedBet from "../placedBet/PlacedBet";
import {connect} from "react-redux";
import {IStore} from "../../../../index";
import {IDeviceInfo} from "../../../bets/deviceInfo";
import {IEventPlacedBet} from "../../types/EventTypes";

export interface Props {
    deviceInfo: IDeviceInfo;
    placedBets: IEventPlacedBet[];
    isAmount: boolean;
}

const PlacedBets: FC<Props> = ({deviceInfo, placedBets, isAmount}) => {

    const content = placedBets && placedBets.map((bet: IEventPlacedBet) =>
        <PlacedBet
            key={bet.betId}
            betName={bet.betName}
            potential={bet.potential}
            amount={isAmount && bet.amount}
        />)

    return ((<>{
        deviceInfo.isDesktop
            ? <SimpleBar className="wrapper-placed-bets" autoHide={false}>
                {content}
            </SimpleBar>
            : <div className="wrapper-placed-bets">
                {content}
            </div>
    }</>));
};

export default connect(
    ({deviceInfo}: IStore) => ({
        deviceInfo
    })
)(PlacedBets);