import React, {FC, useEffect, useRef} from 'react';
import StakeInput from "./selectedBetInput/StakeInput";
import {ISelectedBet, IStateBetSlip} from "../../betSlipReducer";
import {connect} from "react-redux";
import {changeBetSelected, disableBet} from "../../../../bets/actions";
import {betsConfig, classList} from "../../../../../core/constants";
import {IBalance} from "../../../../header/balance/userBalance";
import {IDeviceInfo} from "../../../../bets/deviceInfo";
import {IStore} from "../../../../../index";
import {IBetsState} from "../../../../bets/betsReducer";
import {ITeamsState} from "../../../headerOfTeams/teamsInfo";

interface Props {
    selectedBet: ISelectedBet;
    removeBet: Function;
    changeValueOfSelectedField: Function;
    disableBet: Function;
    changeInputStake: Function;
    setBetError: Function;
    betSlip: IStateBetSlip;
    userBalance: IBalance;
    isOpened: boolean;
    handleTransitionend: Function;
    deviceInfo: IDeviceInfo;
    bets: IBetsState;
    teamsInfo: ITeamsState;
}

const SelectedBet: FC<Props> = ({selectedBet, bets, teamsInfo, removeBet, deviceInfo, changeInputStake, handleTransitionend, userBalance, isOpened, changeValueOfSelectedField, disableBet, betSlip, setBetError}) => {

    const betRef = useRef<HTMLDivElement>(null);
    const marginRef = useRef<number>(-64);

    const closeBet = () => {
        changeValueOfSelectedField(selectedBet.id);
        disableBet(selectedBet.id, true)
        removeBet(selectedBet.id);
        anim();
    }

    const anim = () => {
        selectedBet.toHide ? marginRef.current -= 4 : marginRef.current += 4;

        betRef.current &&
        (betRef.current.style[(betSlip.selectedBets.length > 2 || isOpened || deviceInfo.isDesktop) ? "marginTop" : "marginBottom"] = `${marginRef.current}px`) &&
        (betRef.current.style.pointerEvents = "none");

        if (betRef.current && (selectedBet.toHide ? marginRef.current >= -64 : marginRef.current <= 0)) {
            requestAnimationFrame(anim)
        } else {
            betRef.current &&
            (betRef.current.style[(betSlip.selectedBets.length > 2 || isOpened || deviceInfo.isDesktop) ? "marginTop" : "marginBottom"] = "0") &&
            (betRef.current.style.pointerEvents = "auto");

            disableBet(selectedBet.id, false)
            handleTransitionend()

            if (selectedBet.toHide) {
                removeBet(selectedBet.id);
                handleTransitionend()
            }
        }
    }

    useEffect(() => {
        disableBet(selectedBet.id, true);
        anim();
    }, [selectedBet.toHide])

    useEffect(() => {
        if (betSlip.totalBet > +userBalance.value) {
            setBetError("error-max-max", selectedBet.id)
        } else if (selectedBet.value > betsConfig.maxStake) {
            setBetError("error-max", selectedBet.id)
        } else if (selectedBet.value < betsConfig.minStake) {
            setBetError("error-min", selectedBet.id)
        } else {
            setBetError("", selectedBet.id)
        }
    }, [betSlip.totalBet, selectedBet.value])


    let groupName = "";
    let subGroupName = "";

    bets.betGroups.forEach((group) => {
        group.subGroups ? group.subGroups.forEach((subgroup) => {
            subgroup.betTypes.map((id) => {
                if (selectedBet.id === id) {
                    groupName = group.name;
                    subGroupName = subgroup.name;
                }
            })
        }) : group.betTypes?.forEach((id) => {
            if (selectedBet.id === id) {
                groupName = group.name;
            }
        })
    })

    if (subGroupName === "{homeTeam}") {
        subGroupName = teamsInfo.teams[teamsInfo.activeTeams[0]].name;
    } else if (subGroupName === "{awayTeam}") {
        subGroupName = teamsInfo.teams[teamsInfo.activeTeams[1]].name;
    }

    return (
        <div
            ref={betRef}
            className={classList([
                "selected-bet-wrapper",
                "keyboard-inject",
                selectedBet.errorType
            ])}>
            <div className="selected-bet">
                <div>
                    <h6>{groupName}</h6>
                    <span
                        className="selected-bet-name-odd">{subGroupName} {selectedBet.name ? (` (${selectedBet.name}) `) : ""}<span>
                        @{selectedBet.odd}</span></span>
                </div>
                <div>
                    <div>
                        <StakeInput
                            stake={selectedBet.value.toString()}
                            onStakeChange={changeInputStake}
                            betId={selectedBet.id}
                        />
                        <div onClick={closeBet} className="remove-selected-bet"/>
                    </div>
                    <span className="possible-win">Est.:{(selectedBet.value * selectedBet.odd).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeValueOfSelectedField: (id: number) => dispatch(changeBetSelected(id)),
        disableBet: (id: number, disabled: boolean) => dispatch(disableBet(id, disabled)),
    }
}

export default connect(
    ({bets, teamsInfo}: IStore) => ({bets, teamsInfo}),
    mapDispatchToProps
)(SelectedBet);