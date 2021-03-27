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

const Bets: FC<Props> = ({bets, deviceInfo}) => {

    const activeGroup:any = (bets.betsTemplate.filter((group) => {
        return group.name === bets.activeTab;
    }))

    return (
        <div className="menu-bets">
            <Tabs/>
            <div className={"bet-groups" + (deviceInfo.isDesktop ? "" : " mobile")}>

                {deviceInfo.isDesktop ?
                    <>
                        <div>{bets.betGroups
                            .filter((group) => activeGroup[0].options.colsGroups.large[0].includes(group.id))
                            // .sort((gr1, gr2) => {
                            //     const sortArr = orderList[bets.activeTab].desk[0];
                            //     return sortArr.indexOf(gr1.id) - sortArr.indexOf(gr2.id)
                            // })
                            .map((group: IGroup) =>
                                <BetGroup
                                    key={group.id}
                                    name={group.name}
                                    subgroups={group.subGroups}
                                    betTypes={group.betTypes}
                                />
                            )}
                        </div>
                        <div>{bets.betGroups
                            .filter((group) =>  activeGroup[0].options.colsGroups.large[1].includes(group.id))
                            // .sort((gr1, gr2) => {
                            //     const sortArr = orderList[bets.activeTab].desk[1];
                            //     return sortArr.indexOf(gr1.id) - sortArr.indexOf(gr2.id)
                            // })
                            .map((group: IGroup) =>
                                <BetGroup
                            key={group.id}
                            name={group.name}
                            subgroups={group.subGroups}
                            betTypes={group.betTypes}
                            />)}</div>
                    </>
                    : <div>{bets.betGroups
                        .filter((group) =>  activeGroup[0].options.colsGroups.small[0].includes(group.id))
                        .map((group: IGroup) =>
                            <BetGroup
                                key={group.id}
                                name={group.name}
                                subgroups={group.subGroups}
                                betTypes={group.betTypes}
                            />
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default connect(
    ({bets, deviceInfo}: IStore) => ({
        bets,
        deviceInfo
    })
)(Bets);