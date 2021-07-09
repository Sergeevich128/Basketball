import React, {FC, useEffect} from 'react';
import {connect} from "react-redux";
import {IStore} from "../../index";
import "./bets.css";
import {IBetsState, IGroup} from "./betsReducer";
import BetGroup from "./components/BetGroup";
import {IDeviceInfo} from "./deviceInfo";
import Tabs from "./tabs/Tabs";
import BetGroupsLeftDesk from "./components/BetGroupsLeftDesk";
import BetGroupsRightDesk from "./components/BetGroupsRightDesk";
import BetGroupsMobile from "./components/BetGroupsMobile";
import {IMainState} from "../main/mainReducer";

interface Props {
    bets: IBetsState;
    deviceInfo: IDeviceInfo;
    mainReducer: IMainState;
}

const Bets: FC<Props> = ({bets, deviceInfo, mainReducer}) => {

    const IconStarLogic = () => {
        const orderArr: any = [];
        const getTransformValue = (el: any) => +el.style.transform.replace(/[^0-9.-]+/g, "");

        useEffect(() => {
            const container = document.getElementsByClassName("bet-groups")[0];
            const list = container?.getElementsByClassName("group");
            const activeList = container?.getElementsByClassName("active");
            const noActiveList = container?.getElementsByClassName("no-active");

            container.addEventListener("click", (event) => {
                let marginTop = 0;
                [].forEach.call(activeList, (block: any) => marginTop += block.offsetHeight);

                const el: any = event.target
                if (el.closest(".icon-star")) {
                    const group = el.closest(".group");
                    if (group.classList.contains("active")) {

                        let prevEl: any;

                        const getPrevEl = (el: any) => {
                            if (el.classList.contains("active")) {
                                if (el.previousElementSibling) {
                                    getPrevEl(el.previousElementSibling);
                                }
                            } else {
                                prevEl = el;
                            }
                        }

                        [].forEach.call(list, (el) => {
                            if (el === group.previousElementSibling) {
                                getPrevEl(el)
                            }
                        });

                        if (prevEl) {
                            let diffHeight = (group.offsetHeight - prevEl.offsetHeight);
                            group.style.transform = `translateY(${(prevEl.offsetTop + getTransformValue(prevEl)) - group.offsetTop - diffHeight}px)`;
                        } else {
                            let value = group.offsetTop - (marginTop - group.offsetHeight)
                            if (value < 0) value *= -1;
                            group.style.transform = `translateY(${value}px)`;
                        }

                        if (list) {
                            for (let i = 0; i < list.length; i++) {
                                let el: any = list[i];
                                if (el === group) break;
                                if (el.classList.contains("no-active")) {
                                    el.style.transform = `translateY(${getTransformValue(list[i]) - group.offsetHeight}px)`
                                }
                            }
                        }


                        let newActiveArr = orderArr.map((el: any) => el);

                        group.classList.remove("active");
                        group.classList.add("no-active");
                        const index = orderArr.findIndex((el: Element) => el === group);
                        orderArr.splice(index, 1)

                        let deletedEl = newActiveArr.filter((n: any) => orderArr.indexOf(n) === -1);

                        if (newActiveArr.findIndex((i: any) => i === deletedEl[0]) === newActiveArr.length - 1) {
                        } else {
                            let newArr = orderArr.slice(newActiveArr.findIndex((i: any) => i === deletedEl[0]))
                            newArr.forEach((el: any) => {
                                el.style.transform = `translateY(${getTransformValue(el) - group.offsetHeight}px)`
                            })
                        }
                    } else {

                        const {offsetTop, offsetHeight} = group;
                        let finalValue = offsetTop - marginTop;

                        group.style.transform = `translateY(${-finalValue}px)`;

                        if (noActiveList) {
                            for (let i = 0; i < noActiveList.length; i++) {
                                let el: any = noActiveList[i];
                                if (el === group) break;
                                el.style.transform = `translateY(${offsetHeight + getTransformValue(noActiveList[i])}px)`
                            }
                        }

                        group.classList.remove("no-active")
                        group.classList.add("active")
                        orderArr.push(group)
                    }
                }
            })
        }, [])
    }

    const activeGroup: any = (bets.betsTemplate.filter((group) => {
        return group.name === bets.activeTab;
    }))

    const returnBetGroups = (index: number, large: boolean) => {
        return <div className="bet-groups">{bets.betGroups
            .filter((group) => large? activeGroup[0].options.colsGroups.large[index].includes(group.id) :
            activeGroup[0].options.colsGroups.small[index].includes(group.id))
            .sort((gr1, gr2) => {
                return large ? activeGroup[0].options.colsGroups.large[index].indexOf(gr1.id) - activeGroup[0].options.colsGroups.large[index].indexOf(gr2.id):
                    activeGroup[0].options.colsGroups.small[index].indexOf(gr1.id) - activeGroup[0].options.colsGroups.small[index].indexOf(gr2.id)
            })
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

    return (
        <div className="menu-bets">
            <Tabs/>
            <div className={"bet-groups-container" + (deviceInfo.isDesktop ? "" : " mobile")}>
                {deviceInfo.isDesktop ?
                    <>
                        <BetGroupsLeftDesk returnBetGroups={returnBetGroups} iconStarLogic={IconStarLogic}/>
                        {/*<BetGroupsRightDesk returnBetGroups={returnBetGroups} iconStarLogic={IconStarLogic}/>*/}
                        {/*{returnBetGroups(0, true)}*/}
                        {returnBetGroups(1, true)}
                    </>
                    : <>
                        {/*{returnBetGroups(0, false)}*/}
                        <BetGroupsMobile returnBetGroups={returnBetGroups} iconStarLogic={IconStarLogic}/>
                    </>
                }
            </div>
        </div>
    );
};

export default connect(
    ({bets, deviceInfo, mainReducer}: IStore) => ({
        bets,
        deviceInfo,
        mainReducer
    })
)(Bets);