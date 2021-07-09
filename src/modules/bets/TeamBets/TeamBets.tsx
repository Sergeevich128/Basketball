import React, {ComponentType, FC} from 'react';
import {connect, Matching} from "react-redux";
import {IStore} from "../../../index";
import {IBetsList, ISubGroup} from "../betsReducer";
import './teamBets.css'
import Bet from "../components/Bet";
import {IEventBets} from "../../main/types/EventTypes";

interface Props {
    subgroups?: ISubGroup[];
    bets: IEventBets;
    firstTeam: string;
    lastTeam: string;
}

const TeamBets: ComponentType<Matching<Props, any>> = ({bets, firstTeam, lastTeam}) => {
    const teamBets = [];

    for (let i in bets) {
        bets[i].name === "" && teamBets.push(bets[i])
    }

    return (
        <div className="team-bets selected">
            <Bet bet={teamBets[0]} name={firstTeam}/>
            <div className="vs">
                <div className="romb">
                    <div>vs</div>
                </div>
            </div>
            <Bet bet={teamBets[1]} name={lastTeam}/>
        </div>
    );
};

export default connect(
    ({mainReducer}: IStore) => ({
        bets: mainReducer.previewData?.bets,
    }),
)(TeamBets);