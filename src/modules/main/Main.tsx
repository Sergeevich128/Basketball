import React, {FC, useEffect, useRef} from 'react';
import './main..css'
import {connect} from 'react-redux';
import {IStore} from "../../index";
import {changeStake} from "./selectedBets/actions";
import {IStateBetSlip} from "./selectedBets/betSlip";
import SelectedBets from "./selectedBets/SelectedBets";
import Bets from "./bets/Bets";
import Team from "./headerOfTeams/team/Team";
import TeamBets from "./bets/TeamBets/TeamBets";
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
  prevBtn?: Function;
  nextBtn?: Function;
  teamLeft: ITeam;
  teamRight: ITeam;
  oldMatchStatistics: IOldMatchStatistic;
  history: Array<Array<number>>
}

const Main: FC<Props> = ({changeStake, prevBtn, nextBtn, betSlip, teamLeft, teamRight, oldMatchStatistics}) => {
  let onStakeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const stake = event.target.value;
    changeStake && changeStake(+stake)
  }

  const changePrev = () => {
    prevBtn && prevBtn();
  }

  const changeNext = () => {
    nextBtn && nextBtn();
  }

  const headerOfTeams = useRef(null);
  useEffect(() => {
    setInterval(() => {
      // @ts-ignore
      headerOfTeams.current.classList.toggle('old-match-statistics-visible');
    }, 4000)
  }, []);

  const showAdvancedStatistics = (event: React.MouseEvent<SVGElement>) => {
    if (event.currentTarget.parentElement) {
      event.currentTarget.parentElement.classList.toggle("show-statistics")
      if (event.currentTarget.parentElement.classList.contains("show-statistics")) {
      }
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
        <div className="bet-slip">
          <div className="header">
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