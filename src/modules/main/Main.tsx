import React, {FC, useEffect, useRef, useState} from 'react';
import './main..css'
import {connect} from 'react-redux';
import {IStore} from "../../index";
import {changeDefaultStake} from "./betSlip/actions";
import {IStateBetSlip} from "./betSlip/betSlipReducer";
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
import {pressNextBtn, pressPrevBtn} from "./headerOfTeams/actions";
import BetSlip from "./betSlip/BetSlip";
import changeOldMatchStatisticsClass from "./mainTimeouts";

interface Props {
  betSlip: IStateBetSlip;
  pressPrevBtn: Function;
  pressNextBtn: Function;
  teamLeft: ITeam;
  teamRight: ITeam;
  oldMatchStatistics: IOldMatchStatistic;
  history: Array<Array<number>>;
}

const Main: FC<Props> = ({history, pressPrevBtn, pressNextBtn, betSlip, teamLeft, teamRight, oldMatchStatistics}) => {

  const headerOfTeamsRef = useRef<HTMLDivElement>(null);

  let canSwitch = false;
  const [isSwitchTeams, setSwitchTeamsClass] = useState<boolean>(false);
  const [isOldMatchStatistics, setOldMatchStatisticsClass] = useState<boolean>(false);

  useEffect(() => {
    changeOldMatchStatisticsClass(setOldMatchStatisticsClass, isOldMatchStatistics)
  }, [isOldMatchStatistics]);

  if (isSwitchTeams) {
    setTimeout(() => {
      setSwitchTeamsClass(false)
    }, 500)
  }

  setTimeout(() => {
    canSwitch = true
  }, 1000)

  const classList = [
    "header-of-teams",
    isOldMatchStatistics && "old-match-statistics-visible",
    isSwitchTeams && "switch-teams",
  ].filter(Boolean).join(" ")

  const changePrev = () => {
    if (history.length !== 1) {
      if (canSwitch) {
        setSwitchTeamsClass(true)

        setTimeout(() => {
          pressPrevBtn()
        }, 450)
      }
    }
  }

  const changeNext = () => {
    if (canSwitch) {
      setSwitchTeamsClass(true)

      setTimeout(() => {
        pressNextBtn()
      }, 450)
    }
  }

  const showAdvancedStatistics = () => {
    headerOfTeamsRef?.current?.classList.toggle('show-statistics');
  }

  return (
    <main>
      <div ref={headerOfTeamsRef} className={classList}>
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
    pressPrevBtn: () => dispatch(pressPrevBtn()),
    pressNextBtn: () => dispatch(pressNextBtn()),
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