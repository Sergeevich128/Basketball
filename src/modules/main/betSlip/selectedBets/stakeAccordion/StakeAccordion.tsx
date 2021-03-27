import React, {FC, ForwardedRef, useEffect, useState} from 'react';
import "./stakeAccordion.css"
import {betsConfig} from "../../../../../core/constants"
import {connect} from "react-redux";
import {IStateBetSlip} from "../../betSlipReducer";
import {IStore} from "../../../../../index";
import {IDeviceInfo} from "../../../../bets/deviceInfo";

const keyboardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

interface Props {
    className?: string;
    betSlip: IStateBetSlip;
    betId?: number;
    stake: string;
    onStakeChange: Function;
    hideKeyboard: Function;
    isFocus: boolean;
    setSelectValue: Function;
    isSelectAllNumbers: boolean;
    deviceInfo: IDeviceInfo;
}

const StakeAccordion: FC<Props> = React.forwardRef((
    {
        className,
        deviceInfo,
        betSlip,
        isFocus,
        setSelectValue,
        onStakeChange,
        isSelectAllNumbers,
        hideKeyboard,
        stake,
        betId,
    },
    ref: ForwardedRef<HTMLDivElement>) => {

    const classList = [
        "stake-accordion",
        className,
    ].filter(Boolean).join(" ");

    const [btnGreen, changeBtnColor] = useState<boolean>(false)

    useEffect(() => {
        if (isFocus) {
            changeBtnColor(false)
        }
    }, [isFocus])

    const btnClassList = [
        "confirm",
        btnGreen && "green"
    ].filter(Boolean).join(" ")

    const onChangeFunctions = () => {
        changeBtnColor(true)
        setSelectValue(false)
    }

    const onChange = (num: number) => {
        if (stake.length > 8 || (stake.includes(".") && stake.split(".")[1].length >= 2) || (stake.toString()[0] === "0" && num === 0)) return;

        onStakeChange(isSelectAllNumbers ? num : +stake === 0 ? num : stake + num, betId);
        onChangeFunctions();
    }

    const handleFastStake = (num: number) => {
        onStakeChange(num.toString(), betId);
        !deviceInfo.isDesktop && onChangeFunctions()
    }

    const removeLastNum = () => {
        if (isSelectAllNumbers) {
            onStakeChange("", betId)
        } else {
            onStakeChange(stake.toString().slice(0, -1), betId)
        }
        setSelectValue(false)
    }

    const addPoint = () => {
        if (stake.length === 0) return
        if (isSelectAllNumbers) {
            onStakeChange(".", betId)
        } else if (!stake.toString().includes("."))
            onStakeChange(stake.toString() + ".", betId)
        setSelectValue(false)
    }

    const setConfirmBtn = () => {
        hideKeyboard(false)
        setSelectValue(false)
    }

    return (
        <div
            className={classList}
            ref={ref}
        >
            <div className="error-window">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#FD4141" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M22.4415 15.9532L15.4362 3.97762C14.7329 2.7584 13.4221 2.00166 12.0045 2C10.5867 1.99834 9.2754 2.75196 8.56336 3.97767L1.55543 15.9576C0.828751 17.1795 0.812312 18.7105 1.51618 19.9592C2.22063 21.2089 3.53966 21.9866 4.9744 21.9983L19.0123 21.9983C20.4619 21.9842 21.7784 21.2089 22.4828 19.9603C23.1863 18.7132 23.1706 17.1856 22.4415 15.9532ZM3.27808 16.9737L10.2912 4.98491C10.6464 4.37354 11.2978 3.99918 12.0021 4C12.7064 4.00083 13.3576 4.37673 13.7068 4.98222L20.7177 16.9672C21.0852 17.5885 21.0931 18.3533 20.7408 18.9777C20.3881 19.603 19.7287 19.9913 19.0025 19.9984L4.98253 19.9983C4.27193 19.9925 3.61123 19.6029 3.25844 18.9771C2.90604 18.3519 2.91427 17.5855 3.27808 16.9737ZM12.0003 17.9983C12.5528 17.9983 13.0007 17.5506 13.0007 16.9983C13.0007 16.4461 12.5528 15.9983 12.0003 15.9983C11.4479 15.9983 11 16.4461 11 16.9983C11 17.5506 11.4479 17.9983 12.0003 17.9983ZM13.0036 7.99835H11.003V14.9983H13.0036V7.99835Z"
                          fill="white"/>
                </svg>
                <span className="min">Min bet allowed fun {betsConfig.minStake}</span>
                <span className="max">Max bet allowed fun {betsConfig.maxStake}</span>
                <span className="max-max">Bet amount is higher than balance</span>
            </div>
            <div className="fast-stake">
                {betSlip.fastStakesValue.map((stakeNum, index) => <span
                    key={index}
                    onClick={() => handleFastStake(stakeNum)}
                    className={stake === stakeNum.toString() ? "active" : ""}
                >
                  {stakeNum}
                </span>)}
            </div>
            <div className="keyboard">
                {keyboardValues.map((num: number, index) => {
                    return <span className="num" key={index} onClick={() => onChange(num)}>{num}</span>
                })}
                <div className="dot" onClick={addPoint}/>
                <div className="back-btn" onClick={removeLastNum}>
                    <svg width="35" height="22" viewBox="0 0 35 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M10.0948 3L4.40473 11L10.0948 19H30.7271V3H10.0948ZM8.95452 21L2 11L8.95452 1H32.7726V21H8.95452Z"
                              fill="#595959"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M18.2767 11.3496L13.9866 7.10274L15.4418 5.69727L19.7142 9.92656L23.9866 5.69727L25.4419 7.10274L21.1517 11.3496L25.4419 15.5964L23.9866 17.0019L19.7142 12.7726L15.4418 17.0019L13.9866 15.5964L18.2767 11.3496Z"
                              fill="#595959"/>
                    </svg>
                </div>
                <div className={btnClassList} onClick={setConfirmBtn}>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="svg-confirm" fillRule="evenodd" clipRule="evenodd"
                              d="M12.2579 23C6.12095 23 1.146 18.0751 1.146 12C1.146 5.92487 6.12095 1 12.2579 1C18.3948 1 23.3697 5.92487 23.3697 12C23.3697 18.0751 18.3948 23 12.2579 23ZM12.2582 21C17.2793 21 21.3497 16.9706 21.3497 12C21.3497 7.02944 17.2793 3 12.2582 3C7.23704 3 3.16662 7.02944 3.16662 12C3.16662 16.9706 7.23704 21 12.2582 21ZM15.5842 8.29289L10.2375 13.5858L7.92125 11.2929L6.49265 12.7071L10.2375 16.4142L17.0128 9.70711L15.5842 8.29289Z"
                              fill="#595959"/>
                    </svg>
                </div>
            </div>
        </div>
    );
});

export default connect(
    ({betSlip, deviceInfo}: IStore) => ({
        betSlip,
        deviceInfo
    }),
    null,
    null,
    {forwardRef: true}
)(StakeAccordion);