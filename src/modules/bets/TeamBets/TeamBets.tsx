import React, {FC} from 'react';
import {connect} from "react-redux";
import {IStore} from "../../../index";
import { IBetsList, ISubGroup} from "../betsReducer";
import './teamBets.css'

interface Props {
    subgroups?: ISubGroup[];
    bets: IBetsList;
}

const TeamBets: FC<Props> = ({bets}) => {
    // const bet = bets.filter((bet) => bet.groupName === 'Money line');

    return (
        <div className="team-bets selected">
            {/*<Bet bet={bet[0]} name={bet[0].subgroupName}/>*/}
            {/*<div className="vs">*/}
            {/*    <div className="romb">*/}
            {/*        <div>vs</div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<Bet bet={bet[1]} name={bet[1].subgroupName}/>*/}
        </div>
    );
};

export default connect(
    ({bets}: IStore) => ({
        bets: bets.betsList
    }),
)(TeamBets);