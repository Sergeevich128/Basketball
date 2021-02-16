import React, {FC} from 'react';
import {connect} from "react-redux";
import {IStore} from "../../index";
import "./bets.css";
import {IBetsState, IGroup} from "./betsReducer";
import BetGroup from "./components/BetGroup";
import {IDeviceInfo} from "./deviceInfo";
import Tabs from "./tabs/Tabs";

interface Props {
  bets: IBetsState;
  deviceInfo: IDeviceInfo;
}

const orderList: { [key: number]: number[] } = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  2: [1, 4, 5, 8, 9],
  3: [2, 6, 10],
  4: [3, 6, 7]
}

const Bets: FC<Props> = ({bets, deviceInfo}) => (
  <div className="menu-bets">
    <Tabs/>
    <div className={"bet-groups" + (deviceInfo.isDesktop ? "" : " mobile")}>
      <div>{bets.betGroupsLeft
        .filter((group) => orderList[bets.activeTabId].includes(group.id))
        .map((group: IGroup) => <BetGroup key={group.id} name={group.name}
                                          subgroups={group.subgroups}/>)}</div>
      <div>{bets.betGroupsRight
        .filter((group) => orderList[bets.activeTabId].includes(group.id))
        .map((group: IGroup) => <BetGroup key={group.id} name={group.name}
                                          subgroups={group.subgroups}/>)}</div>
    </div>
  </div>
);

export default connect(
  ({bets, deviceInfo}: IStore) => ({
    bets,
    deviceInfo
  })
)(Bets);