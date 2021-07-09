import React, {FC, useEffect, useRef} from "react";
import {IBetsList, ISubGroup} from "../betsReducer";
import {connect} from "react-redux";
import {IStore} from "../../../index";
import {ITeamsState} from "../../main/headerOfTeams/teamsInfo";
import Bet from "./Bet";
import IconStar from "./IconStar";

interface Props {
    key?: number;
    name?: string;
    subgroups?: ISubGroup[];
    betTypes?: Array<number>;
    bets: IBetsList;
    teamsInfo: ITeamsState;
}

const BetGroup: FC<Props> = ({key, name, subgroups, betTypes, bets, teamsInfo}) => {

    let groupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let subGroups = document.getElementsByClassName("subgroups");
        for (let el = 0; el < subGroups.length; el++) {
            let subGroup = subGroups[el] as HTMLElement;
            subGroup.dataset.height = subGroup.scrollHeight.toString();
            subGroup.style.height = `${subGroup.dataset.height}px`;
        }
    })

    const openGroup = (event: React.MouseEvent<HTMLDivElement>) => {
        let group: HTMLElement | null = event.currentTarget.closest(".group");
        if (group) {
            let subGroup = group.getElementsByClassName("subgroups")[0] as HTMLElement;
            if (subGroup.style.height === "0px") {
                subGroup.style.height = `${subGroup.dataset.height}px`;
            } else {
                subGroup.style.height = "0px"
            }
            group.classList.toggle("closed");
        }
    }

    const firstTeam = teamsInfo.teams[teamsInfo.activeTeams[0]]
    const lastTeam = teamsInfo.teams[teamsInfo.activeTeams[1]]

    return (
        <div ref={groupRef} key={key} className="group no-active">
            <h3>
                <IconStar/>
                {name}
                <div onClick={openGroup} className="open-group"/>
            </h3>
            <div className="subgroups">
                {subgroups ? subgroups && subgroups.map((subgroup: ISubGroup) => (
                        <div key={subgroup.id} className="subgroup">
                            <h4 style={{
                                background: subgroup.name === "{homeTeam}" ? firstTeam?.bgColor :
                                    subgroup.name === "{awayTeam}" ? lastTeam?.bgColor : "#E3E3E3",
                                color: subgroup.name === "{homeTeam}" || subgroup.name === "{awayTeam}" ? "" : "#26282B"
                            }}>
                                {subgroup.name === "{homeTeam}" ? firstTeam?.name :
                                    subgroup.name === "{awayTeam}" ? lastTeam?.name : subgroup.name}</h4>
                            <div className="bets">
                                {subgroup.betTypes.map((id: number) => {
                                    if (bets[id]) {
                                        return <Bet key={bets[id].id} bet={bets[id]}/>
                                    }
                                })}
                            </div>
                        </div>
                    )
                ) : <div className="subgroup single">
                    <div className="bets">
                        {betTypes && betTypes.map((id: number) => {

                            if (bets[id]) {
                                return <Bet key={bets[id].id} bet={bets[id]}/>
                            }
                        })}
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default connect(
    ({bets, teamsInfo}: IStore) => ({bets: bets.betsList, teamsInfo}),
)(BetGroup);