import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import "./stakeInput.css"
import {IDeviceInfo} from "../../../../../bets/deviceInfo";
import {connect} from "react-redux";
import {IStore} from "../../../../../../index";
import {createPortal} from "react-dom";
import StakeAccordion from "../../stakeAccordion/StakeAccordion";
import {classList} from "../../../../../../core/constants";

interface Props {
    deviceInfo?: IDeviceInfo;
    stake: string;
    betId?: number;
    onStakeChange: Function;
}

const StakeInput: FC<Props> = ({stake, deviceInfo, betId, onStakeChange}) => {

    const keyboardRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | HTMLSpanElement>(null);

    const [isFocus, setIsFocus] = useState(false);
    const [isMounted, changeMounted] = useState<boolean>(false);
    const [isSelectAllNumbers, setSelectValue] = useState<boolean>(false)

    useEffect(() => {
        if (isFocus) {
            setSelectValue(true)
        } else {
            if (stake === "")
                onStakeChange("0", betId)
        }
    }, [isFocus])

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (stake.length > 8 || (stake.includes(".") && stake.split(".")[1].length >= 2)) return;
        onStakeChange(event.currentTarget?.value ? event.currentTarget?.value.toString() : event.currentTarget.innerText, betId)
        deviceInfo?.isDesktop ? setSelectValue(true) : setSelectValue(false)
    }

    useEffect(() => {
        changeMounted(true);
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        }
    }, [])



    const showStakeAccordion = () => {
        setIsFocus(true)
        isSelectAllNumbers ? setSelectValue(false) : setSelectValue(true)
    }

    const handleOutsideClick: any = (event: Event) => {
        if (
            (inputRef.current && !inputRef.current.contains(event.target as Node)) &&
            (keyboardRef.current && !keyboardRef.current.contains(event.target as Node))
        ) {
            setIsFocus(false)
            setSelectValue(false)
        }
    }

    return (
        <>
            <>
                {deviceInfo?.isDesktop
                    ? <input
                        // @ts-ignore
                        ref={inputRef}
                        type="number"
                        className={classList(["selected-bet-input", isSelectAllNumbers && "active"])}
                        value={stake}
                        onClick={() => setIsFocus(true)}
                        onChange={onChange}
                    />
                    : <span
                        ref={inputRef}
                        className={classList(["selected-bet-input", isSelectAllNumbers && "active"])}
                        onClick={showStakeAccordion}
                    >
                        <span>{stake}</span>
                  </span>
                }
            </>
            {isMounted && createPortal(
                <StakeAccordion
                    // @ts-ignore
                    ref={keyboardRef}
                    stake={stake}
                    onStakeChange={onStakeChange}
                    betId={betId}
                    className={isFocus ? "show-keyboard" : undefined}
                    hideKeyboard={setIsFocus}
                    isFocus={isFocus}
                    isSelectAllNumbers={isSelectAllNumbers}
                    setSelectValue={setSelectValue}
                />,
                // @ts-ignore
                inputRef.current.closest(".keyboard-inject")
            )}
        </>
    );
};


export default connect(
    ({deviceInfo, betSlip, userBalance}: IStore) => ({
        deviceInfo,
        betSlip,
        userBalance
    }),
)(StakeInput);
