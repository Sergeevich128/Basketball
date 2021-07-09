import React, {ComponentType, FC, useEffect, useState} from 'react';
import './main.css'
import {connect, Matching} from 'react-redux';
import {IStore} from "../../index";
import ReturnContent from "./ReturnContent";
import Preview from "./preview/Preview";
import Run from "./run/Run";
import Result from "./results/Result";
import {IMainState} from "./mainReducer";
import {IEventPlacedBet} from "./types/EventTypes";
import {IActiveWindow} from "./activeWiindowReducer";

interface Props {
    mainReducer: IMainState;
    placedBets: IEventPlacedBet[];
    activeWindow: IActiveWindow;
}

const Main: ComponentType<Matching<Props, any>> = ({activeWindow, mainReducer, placedBets}) => {

    const content =
        <main>
            {mainReducer.previewData && <Preview/>}
            {mainReducer.runData && <Run placedBets={placedBets}/>}
            {mainReducer.resultData && <Result/>}
        </main>

    return (
        content
    );
};


export default connect(
    ({mainReducer, activeWindowReducer}: IStore) => ({
        mainReducer,
        activeWindow: activeWindowReducer.activeWindow,
        placedBets: mainReducer.runData?.placedBets
    }),

)(Main);