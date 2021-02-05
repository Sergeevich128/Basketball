import React, {FC, useEffect, useRef} from 'react';
import './main..css'
import {connect} from 'react-redux';
import {IStore} from "../../index";
import {changeDefaultStake} from "../selectedBets/actions";
import {ISelectedBet, IStateBetSlip} from "../selectedBets/betSlip";
import SelectedBets from "../selectedBets/SelectedBets";
import Bets from "../bets/Bets";
import Team from "./headerOfTeams/team/Team";
import TeamBets from "../bets/TeamBets/TeamBets";
import ChangeMatch from "./headerOfTeams/sliderChangeMatch/ChangeMatch";
import AdvancedStatistics from "./headerOfTeams/advancedStatistics/AdvancedStatistics";
import {IOldMatchStatistic, ITeam} from "./headerOfTeams/teamsInfo";
import Statistics from "./headerOfTeams/statistics/Statistics";
import AdvancedButton from "./headerOfTeams/advancedBtn/AdvancedButton";
import OldMatchStatistics from "./headerOfTeams/oldMatchStatistics/OldMatchStatistics";
import Last from "./headerOfTeams/last/Last";
import {nextBtn, prevBtn} from "./headerOfTeams/actions";
import StakeAccordion from "../selectedBets/stakeAccordion/StakeAccordion";
import {IDeviceInfo} from "../bets/deviceInfo";
import SelectedBetInput from "../selectedBets/selectedBet/selectedBetInput/SelectedBetInput";
import BetSlipHeader from "./betSlip/betSlipHeader/BetSlipHeader";
import BetSlip from "./betSlip/betSlip";

interface Props {
  betSlip: IStateBetSlip;
  prevBtn: Function;
  nextBtn: Function;
  teamLeft: ITeam;
  teamRight: ITeam;
  oldMatchStatistics: IOldMatchStatistic;
  history: Array<Array<number>>;
}

const Main: FC<Props> = ({history, prevBtn, nextBtn, betSlip, teamLeft, teamRight, oldMatchStatistics}) => {

  const headerOfTeams = useRef<HTMLDivElement>(null);

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
        <BetSlip/>
      </div>
    </main>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeDefaultStake: (stake: any) => dispatch(changeDefaultStake(stake)),
    prevBtn: () => dispatch(prevBtn()),
    nextBtn: () => dispatch(nextBtn()),
  }
}

export default connect(
  ({betSlip, teamsInfo, deviceInfo}: IStore) => ({
    betSlip,
    oldMatchStatistics: teamsInfo.oldMatchStatistics.Anadolu_Zalgiris,
    teamLeft: teamsInfo.teams[teamsInfo.history[teamsInfo.history.length - 1][0]],
    teamRight: teamsInfo.teams[teamsInfo.history[teamsInfo.history.length - 1][1]],
    history: teamsInfo.history,
    deviceInfo
  }),
  mapDispatchToProps
)(Main);