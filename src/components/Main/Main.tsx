import React from 'react';
import s from './Main.module.css'
import {IGroup, IBet, ISubGroup, initialState} from "../../storages/betsReducer";
import { connect } from 'react-redux';

const Main = (bets:any) => {

    const handleBetClick = (event: React.MouseEvent<HTMLDivElement>, bet: IBet) => {
        if(event.currentTarget) event.currentTarget.classList.toggle(s.selected)
    }

    return (
        <main>
            <div className={s.teams}/>
            <div className={s.teamBet}>
                <div className={s.team}>
                    <span>Home team</span>
                    <span className={s.rate}>2.30</span>
                </div>
                <div className={s.vs}>
                    <div className={s.romb}>
                        <div>vs</div>
                    </div>
                </div>
                <div className={s.team}>
                    <span>Away team</span>
                    <span className={s.rate}>1.23</span>
                </div>
            </div>
            <div className={s.betsZone}>
                <div className={s.menuBets}>
                    <div className={s.headerBets}>
                        <div>All</div>
                        <div>Game Lines</div>
                        <div>U/O</div>
                        <div>Halftime</div>
                    </div>
                    <div className={s.betGroups}>
                        {bets.map((group:IGroup) => {
                            return <div key={group.id} className={s.group}>
                                <h3>
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8 0L9.88091 5.41115L15.6085 5.52786L11.0434 8.98885L12.7023 14.4721L8 11.2L3.29772 14.4721L4.95662 8.98885L0.391548 5.52786L6.11909 5.41115L8 0Z"
                                            fill="#232527"/>
                                    </svg>
                                    {group.name}
                                    <div className={s.openGroup}><span/></div>
                                </h3>
                                <div className={s.subGroups}>
                                    {group.subgroups.map((subgroup:ISubGroup) => {
                                        return <div key={subgroup.id} className={s.subgroup}>
                                            <h4>{subgroup.name}</h4>
                                            <div className={s.bets}>
                                                {subgroup.bets.map((bet:IBet) => {
                                                    return <div key={bet.id} data-bet-id={bet.id} className={s.bet}
                                                                onClick={(event: React.MouseEvent<HTMLDivElement>) => handleBetClick(event, bet)}>
                                                        <span>{bet.name}</span>
                                                        <span>{bet.odd}</span>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        })}
                    </div>

                    {/*<div className={`${s.openBets} ${s.handicap}`}>Handicap</div>*/}
                    {/*<div>*/}
                    {/*    <div className={`${s.firstTeam} ${s.betSubTitle}`}>Anadolu Efes</div>*/}
                    {/*    <div className={s.bet}>a</div>*/}
                    {/*    <div className={s.bet}>s</div>*/}
                    {/*    <div className={s.bet}>d</div>*/}
                    {/*    <div className={s.bet}>f</div>*/}
                    {/*    <div className={s.bet}>g</div>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <div className={`${s.lastTeam} ${s.betSubTitle}`}>Bc Zalgiris</div>*/}
                    {/*    <div className={s.bet}>a</div>*/}
                    {/*    <div className={s.bet}>s</div>*/}
                    {/*    <div className={s.bet}>d</div>*/}
                    {/*    <div className={s.bet}>f</div>*/}
                    {/*    <div className={s.bet}>g</div>*/}
                    {/*</div>*/}
                    {/*<div className={`${s.openBets} ${s.totalPoints}`}>U / O total points</div>*/}
                    {/*<div>*/}
                    {/*    <div className={`${s.betSubTitle}`}>Under</div>*/}
                    {/*    <div className={s.bet}>a</div>*/}
                    {/*    <div className={s.bet}>s</div>*/}
                    {/*    <div className={s.bet}>d</div>*/}
                    {/*    <div className={s.bet}>f</div>*/}
                    {/*    <div className={s.bet}>g</div>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <div className={`${s.betSubTitle}`}>Over</div>*/}
                    {/*    <div className={s.bet}>a</div>*/}
                    {/*    <div className={s.bet}>s</div>*/}
                    {/*    <div className={s.bet}>d</div>*/}
                    {/*    <div className={s.bet}>f</div>*/}
                    {/*    <div className={s.bet}>g</div>*/}
                    {/*</div>*/}
                </div>
                <div className={s.betSlip}>
                    <div className={s.header}>
                        <span>Bet Slip</span>
                        <span>500000</span>
                    </div>
                    <div className={s.bets}/>
                    <button>Start Match!</button>
                </div>
            </div>
        </main>
    );
};
//
// const BET_SELECTED = () => {
//     type: BET_SELECTED
// }
//
export default connect(
    state => {
        console.log(state)
        return {
            bets: state.betsReducer
        }
    },
    actions => ({
    })
)(Main);