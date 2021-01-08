import React, {FC} from 'react';
import "./SelectedBets.css";
import {connect} from "react-redux";
import {IStore} from "../../../index";
import {ISelectedBet, IStateBetSlip} from "../../../storages/betSlip";
import SimpleBar from "simplebar-react"
import 'simplebar/dist/simplebar.min.css';
import {changeInputStake, removeSelectedBet} from "../../../storages/actions";
import {IBetsState} from "../../../storages/betsReducer";

interface Props {
    betSlip: IStateBetSlip;
    removeSelectedBet?: Function;
    changeInputStake?: Function;
    bets: IBetsState;
}

const SelectedBets: FC<Props> = ({betSlip, removeSelectedBet, changeInputStake, bets}) => {

    const removeBet = (id: number) => {
        removeSelectedBet && removeSelectedBet(id);
    }

    let onStakeChange = (event: React.ChangeEvent<HTMLInputElement>, selectedBet: ISelectedBet) => {
        changeInputStake && changeInputStake(event.currentTarget?.value, selectedBet.id);
    }

    return (
        <SimpleBar forceVisible="y" autoHide={false} style={{maxHeight: 330}}>
            {betSlip.selectedBets && betSlip.selectedBets.map((selectedBet, index) => {
                console.log(selectedBet);
                bets.betGroups.forEach((group) => {
                        group.subgroups.forEach((subGroup) => {
                            subGroup.bets.forEach((bet) => {
                                if (bet.id === selectedBet.id) {
                                    console.log(group.name)
                                    console.log(subGroup.name)
                                    console.log(bet)
                                }
                            })
                        })
                    })
                return <div key={index} className={'selectedBet'}>
                    <div>
                        <h6>Handicap</h6>
                        <h5>Anadolu Efes({selectedBet.name})<span>@{selectedBet.odd}</span></h5>
                    </div>
                    <div>
                        <input type="number" onChange={(event) => onStakeChange(event, selectedBet)}
                               value={selectedBet.value}/>
                        <div onClick={() => removeBet(selectedBet.id)} className={'removeSelectedBet'}/>
                    </div>
                </div>
            })}
        </SimpleBar>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeSelectedBet: (id: number) => dispatch(removeSelectedBet(id)),
        changeInputStake: (stake: number, id: number) => dispatch(changeInputStake(stake, id))
    }
}

export default connect(
    ({betSlip, bets}: IStore) => ({
        betSlip,
        bets
    }), mapDispatchToProps
)(SelectedBets);