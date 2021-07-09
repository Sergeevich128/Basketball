import React, {FC, useEffect, useState} from 'react';
import "./button.css";
import {platform_token} from "../../../../../core/constants";
import {ISelectedBet, IStateBetSlip} from "../../../betSlip/betSlipReducer";
import {connect} from "react-redux";
import {IStore} from "../../../../../index";

export interface Props {
    className: string;
    text: string;
    betSlip: IStateBetSlip;
    calcTotalBet?: boolean;
    calcPossibleWinInfo?: boolean;
    callback?: () => void;
    selectedBetsCounter?: boolean;
    isRebet?: boolean;
}

const Button: FC<Props> = ({
                               className,
                               text,
                               betSlip,
                               calcPossibleWinInfo,
                               selectedBetsCounter,
                               isRebet,
                               calcTotalBet,
                               callback
                           }) => {

    const calcPossibleWin = (): number => {
        return betSlip.selectedBets.reduce((acc, selectedBet: ISelectedBet) => {
            return acc += +(selectedBet.value * selectedBet.odd).toFixed(2);
        }, 0)
    }

    const [possibleWin, setPossibleWin] = useState<number>(calcPossibleWin());

    useEffect(() => {
        setPossibleWin(calcPossibleWin())
    }, [betSlip.totalBet])

    return (
        <div className={`btn ${className}`} onClick={callback}>
            {selectedBetsCounter && <span className="selected-bets-counter">{betSlip.selectedBets.length}</span>}
            {isRebet && <svg width="30" height="38" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d)">
                    <path
                        d="M6.11336 0H0V37H6.11336C6.11336 35.4697 7.35955 34.2219 8.88789 34.2219C10.4162 34.2219 11.6624 35.4697 11.6624 37H17.2115C17.2115 35.4697 18.4577 34.2219 19.986 34.2219C21.5143 34.2219 22.7605 35.4697 22.7605 37H28.3331V0H22.7605C22.7605 1.53033 21.5143 2.77814 19.986 2.77814C18.4577 2.77814 17.2115 1.53033 17.2115 0H11.6624C11.6624 1.53033 10.4162 2.77814 8.88789 2.77814C7.35955 2.77814 6.11336 1.53033 6.11336 0Z"
                        fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M19.8069 14C18.4465 12.0787 16.3936 11 14 11C9.58172 11 6 14.5817 6 19C6 23.4183 9.58172 27 14 27C18.4183 27 22 23.4183 22 19H24C24 24.5228 19.5228 29 14 29C8.47715 29 4 24.5228 4 19C4 13.4772 8.47715 9 14 9C16.8042 9 19.2749 10.1825 21 12.2703V9H23V16H16V14H19.8069Z"
                          fill="#EB460C"/>
                </g>
                <defs>
                    <filter id="filter0_d" x="0" y="0" width="29.3331" height="38" filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix"
                                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                        <feOffset dx="1" dy="1"/>
                        <feColorMatrix type="matrix"
                                       values="0 0 0 0 0.843137 0 0 0 0 0.843137 0 0 0 0 0.843137 0 0 0 1 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                    </filter>
                </defs>
            </svg>}
            <span>{text}</span>
            {calcPossibleWinInfo || calcTotalBet ? <div>
                {calcTotalBet && <span className="total-bet-info">Total Bet: FUN {betSlip.totalBet}</span>}
                {calcPossibleWinInfo && <span className="possible-win-info">Est.: FUN {possibleWin.toFixed(2)}</span>}
            </div> : null}
        </div>
    );
};

export default connect(
    ({betSlip}: IStore) => ({
        betSlip,
    })
)(Button);