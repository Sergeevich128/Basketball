import React, {FC, useRef, useState} from 'react';
import './Main..css'
import {connect} from 'react-redux';
import {IStore} from "../../index";
import {changeStake} from "../../storages/actions";
import betSlip, {IStateBetSlip} from "../../storages/betSlip";
import SelectedBets from "./selectedBets/SelectedBets";
import Bets from "./bets/Bets";
import Team from "./headerOfTeams/team/Team";
import TeamBets from "./bets/TeamBets/TeamBets";
import ChangeMatch from "./headerOfTeams/sliderChangeMatch/ChangeMatch";
import AdvancedStatistics from "./headerOfTeams/advancedStatistics/AdvancedStatistics";
import {IOldMatchStatistic, ITeam, ITeamsState} from "../../storages/teamsInfo";
import Statistics from "./headerOfTeams/statistics/Statistics";
import AdvancedButton from "./headerOfTeams/advancedBtn/AdvancedButton";
import OldMatchStatistics from "./headerOfTeams/oldMatchStatistics/OldMatchStatistics";
import Last from "./headerOfTeams/last/Last";

interface Props {
  betSlip: IStateBetSlip;
  changeStake?: Function;
  teamsInfo: ITeamsState;
  teamLeft: ITeam;
  teamRight: ITeam;
  oldMatchStatistics: IOldMatchStatistic;
}

const Main: FC<Props> = ({changeStake, betSlip, teamsInfo, teamLeft, teamRight, oldMatchStatistics}) => {
  let onStakeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const stake = event.target.value;
    changeStake && changeStake(+stake)
  }

  const headerOfTeams = useRef(null);


  const handleClass = setInterval(() => {
    // @ts-ignore
    headerOfTeams.current.classList.toggle('oldMatchStatisticsVisible');
  }, 4000)

  const showAdvancedStatistics = (event: React.MouseEvent<SVGElement>) => {
    if (event.currentTarget.parentElement) {
      event.currentTarget.parentElement.classList.toggle('showStatistics')
      if (event.currentTarget.parentElement.classList.contains('showStatistics')) {
        clearInterval(handleClass)
      } else {

      }
    }
  }


  return (
    <main>
      <div ref={headerOfTeams} className={"headerOfTeams"}>
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
        <div className="advancedStatisticsWrapper">
          <AdvancedStatistics team={teamLeft.statistics}/>
          <AdvancedStatistics team={teamRight.statistics}/>
        </div>
        <TeamBets/>
      </div>
      <div className={"betsZone"}>
        <Bets/>
        <div className={"betSlip"}>
          <div className={"header"}>
            <div>Bet Slip</div>
            <div>
              <span>Default Stake</span>
              <input value={betSlip.defaultStake} type="number" onChange={onStakeChange}/>
            </div>
          </div>
          <SelectedBets/>
          <button>Start Match!</button>
        </div>
      </div>
    </main>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeStake: (stake: any) => dispatch(changeStake(stake))
  }
}

let random = Math.round(Math.random() * (14 - 1) + 1);
let random2 = Math.round(Math.random() * (14 - 1) + 1);
if (random2 === random) {
  random2 = Math.round(Math.random() * (14 - 1) + 1);
}

const changePrev = () => {
  random--;
  random2--;
  console.log(random);
  console.log(random2);

}

const changeNext = () => {
  random++;
  random2++;
  console.log(random);
  console.log(random2);
}


export default connect(
  ({betSlip, teamsInfo}: IStore) => ({
    betSlip,
    teamsInfo,
    oldMatchStatistics: teamsInfo.oldMatchStatistics.Anadolu_Zalgiris,
    teamLeft: teamsInfo.teams[random],
    teamRight: teamsInfo.teams[random2],
  }),
  mapDispatchToProps
)(Main);