import React, {FC, useEffect, useRef} from 'react';
import './main..css'
import {connect} from 'react-redux';
import {IStore} from "../../index";
import {changeStake} from "../selectedBets/actions";
import {IStateBetSlip} from "../selectedBets/betSlip";
import SelectedBets from "../selectedBets/SelectedBets";
import Bets from "../bets/Bets";
import Team from "./headerOfTeams/team/Team";
import TeamBets from "../bets/TeamBets/TeamBets";
import ChangeMatch from "./headerOfTeams/sliderChangeMatch/ChangeMatch";
import AdvancedStatistics from "./headerOfTeams/advancedStatistics/AdvancedStatistics";
import {IOldMatchStatistic, ITeam, ITeamsState} from "./headerOfTeams/teamsInfo";
import Statistics from "./headerOfTeams/statistics/Statistics";
import AdvancedButton from "./headerOfTeams/advancedBtn/AdvancedButton";
import OldMatchStatistics from "./headerOfTeams/oldMatchStatistics/OldMatchStatistics";
import Last from "./headerOfTeams/last/Last";
import {nextBtn, prevBtn} from "./headerOfTeams/actions";

interface Props {
  betSlip: IStateBetSlip;
  changeStake?: Function;
  prevBtn: Function;
  nextBtn: Function;
  teamLeft: ITeam;
  teamRight: ITeam;
  oldMatchStatistics: IOldMatchStatistic;
  history: Array<Array<number>>
}

const Main: FC<Props> = ({changeStake, history, prevBtn, nextBtn, betSlip, teamLeft, teamRight, oldMatchStatistics}) => {
  let onStakeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const stake = event.target.value;
    changeStake && changeStake(+stake)
  }

  const headerOfTeams = useRef<HTMLDivElement>(null);
  const betSlipWrapper = useRef<HTMLDivElement>(null);

  let canSwitch = false;
  setTimeout(() => {
    canSwitch = true
  }, 1000)

  const switchTeams = (func: Function) => {
    if (canSwitch) {
      canSwitch = false
      headerOfTeams?.current?.classList.add("switch-teams");
      setTimeout(() => {
        headerOfTeams?.current?.classList.remove("switch-teams");
        headerOfTeams?.current?.classList.add("new-teams");
        setTimeout(() => {
          headerOfTeams?.current?.classList.remove("new-teams");
        }, 500)
      }, 500)
      setTimeout(() => {
        func && func();
      }, 330)
    }
  }

  const changePrev = () => {
    if (history.length !== 1) {
      switchTeams(prevBtn)
    }
  }

  const changeNext = () => {
    switchTeams(nextBtn)
  }

  useEffect(() => {
    setInterval(() => {
      headerOfTeams?.current?.classList.toggle('old-match-statistics-visible');
    }, 4000)
  }, []);

  const showAdvancedStatistics = (event: React.MouseEvent<SVGElement>) => {
    if (event.currentTarget.parentElement) {
      event.currentTarget.parentElement.classList.toggle("show-statistics")
    }
  }

  const chooseBetSlipClassName = () => {
    if (betSlip.selectedBets.length <= 2 && betSlip.selectedBets.length >= 1 && betSlipWrapper?.current?.classList.value !== "bet-slip full") {
      return " mini"
    } else if (betSlip.selectedBets.length > 2) {
      return " hidden"
    } else if (betSlip.selectedBets.length <= 2 && betSlip.selectedBets.length >= 1) {
      return " full"
    } else {
      return ""
    }
  }

  const showFullBetSlip = (event: any) => {
    event.currentTarget.parentElement.parentElement.classList.value = "bet-slip full";
    event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.classList.value = "wrapper header-sticky"
    return false;
  }

  const hideFullBetSlip = (event: any) => {
    if (betSlip.selectedBets.length <= 2) {
      event.currentTarget.parentElement.parentElement.parentElement.classList.value = "bet-slip mini"
    } else {
      event.currentTarget.parentElement.parentElement.parentElement.classList.value = "bet-slip hidden"
    }
    event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.classList.value = "wrapper"
  }

  return (
    <main>
      <div ref={headerOfTeams} className="header-of-teams">
        <ChangeMatch changeNext={changeNext} changePrev={changePrev}/>
        <div className="teams">
          <Team sideOfShadow="left" team={teamLeft}/>
          <Team sideOfShadow="right" team={teamRight}/>
        </div>
        <Last/>
        <div className="statistics">
          <Statistics strength={teamLeft.strength}/>
          <Statistics strength={teamRight.strength}/>
        </div>
        <OldMatchStatistics statistics={oldMatchStatistics}/>
        <AdvancedButton showAdvancedStatistics={showAdvancedStatistics}/>
        <div className="advanced-statistics-wrapper">
          <AdvancedStatistics team={teamLeft.statistics}/>
          <AdvancedStatistics team={teamRight.statistics}/>
        </div>
        <TeamBets/>
      </div>
      <div className="bets-zone">
        <Bets/>
        <div ref={betSlipWrapper} className={"bet-slip" + (chooseBetSlipClassName())}>
          <div className="header">
            <div>Bet Slip</div>
            <div>
              <span>Default Stake</span>
              <input value={betSlip.defaultStake} type="number" onChange={onStakeChange}/>
              <div className="remove-selected-bet" onClick={(event) => hideFullBetSlip(event)}/>
            </div>
          </div>
          <div className="selected-bets">
            <SelectedBets/>
          </div>
          <div>
            <div onClick={(event) => showFullBetSlip(event)}><span>{betSlip.selectedBets.length}</span>Bet Slip</div>
            <button>Start Match!</button>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeStake: (stake: any) => dispatch(changeStake(stake)),
    prevBtn: () => dispatch(prevBtn()),
    nextBtn: () => dispatch(nextBtn()),
  }
}

export default connect(
  ({betSlip, teamsInfo}: IStore) => ({
    betSlip,
    oldMatchStatistics: teamsInfo.oldMatchStatistics.Anadolu_Zalgiris,
    teamLeft: teamsInfo.teams[teamsInfo.history[teamsInfo.history.length - 1][0]],
    teamRight: teamsInfo.teams[teamsInfo.history[teamsInfo.history.length - 1][1]],
    history: teamsInfo.history
  }),
  mapDispatchToProps
)(Main);