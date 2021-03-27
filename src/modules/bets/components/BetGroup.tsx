import React, {FC, useEffect} from "react";
import {IBetsList, ISubGroup} from "../betsReducer";
import {connect} from "react-redux";
import {IStore} from "../../../index";
import {ITeamsState} from "../../main/headerOfTeams/teamsInfo";
import Bet from "./Bet";

interface Props {
    key?: number;
    name?: string;
    subgroups?: ISubGroup[];
    betTypes?: Array<number>;
    bets: IBetsList;
    teamsInfo: ITeamsState;
}

const BetGroup: FC<Props> = ({key, name, subgroups, betTypes, bets, teamsInfo}) => {

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
        <div key={key} className="group">
            <h3>
                <svg onClick={() => console.log(1)} width="16" height="15" viewBox="0 0 16 15" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8 0L9.88091 5.41115L15.6085 5.52786L11.0434 8.98885L12.7023 14.4721L8 11.2L3.29772 14.4721L4.95662 8.98885L0.391548 5.52786L6.11909 5.41115L8 0Z"
                        fill="#232527"
                    />
                </svg>
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